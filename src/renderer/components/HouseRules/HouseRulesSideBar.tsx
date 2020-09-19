import React, { useRef } from "react";
import { useMainReducerCallbacks } from "../../context/mainReducer/MainContext";
import { HouseRuleEnum } from "../../context/mainReducer/mainReducer";

import { addId } from "../../helperFunctions";
import { HouseRule } from "../../types";

interface HouseRulesSidebarProps {
  addNewHouseRules: (rules: HouseRule[]) => void;
  houseRuleToShow: string;
}

const HouseRulesSidebar = (props: HouseRulesSidebarProps) => {
  const { setHouseRuleToShow } = useMainReducerCallbacks();
  const fileUpload = useRef<HTMLInputElement>(null);

  const { addNewHouseRules, houseRuleToShow } = props;
  const fileUploaded = (files: FileList) => {
    Promise.all(
      Object.values(files).map((file) =>
        new Promise((resolve) => {
          const fileReader = new FileReader();
          // @ts-ignore
          fileReader.onload = (e) => resolve(e.target.result);
          fileReader.readAsText(file);
        })
          // @ts-ignore
          // tslint:disable-next-line:no-eval
          .then((script) => eval(script))
          .then((rule) => addId(rule))
      )
    )
      .then((rules) => addNewHouseRules(rules))
      .then(() => {
        if (fileUpload && fileUpload.current) {
          fileUpload.current.value = "";
        }
      });
  };

  const show = (template: HouseRuleEnum) => {
    setHouseRuleToShow(template);
  };

  const renderListElement = (template: HouseRuleEnum, name: string) => (
    <li
      key={`rules${template}`}
      className={
        houseRuleToShow === template
          ? "list-group-item active"
          : "list-group-item cursor-pointer"
      }
      onClick={() => show(template)}
    >
      <div className="row">
        <div className="offset-2">{name}</div>
      </div>
    </li>
  );

  return (
    <div>
      <div className="row p-2">
        <div className="custom-file cursor-pointer">
          <input
            ref={fileUpload}
            id="validatedCustomHouseRuleFile"
            data-testid="validatedCustomHouseRuleFile"
            className="custom-file-input"
            type="file"
            accept="application/javascript"
            multiple={true}
            onChange={(e) => {
              if (e.target.files) {
                fileUploaded(e.target.files);
              }
            }}
          />
          <label
            className="custom-file-label cursor-pointer"
            htmlFor="validatedCustomHouseRuleFile"
          >
            Hausregel
          </label>
        </div>
      </div>
      <div className="row">
        <ul className="list-group list-group-flush col-12">
          {renderListElement(HouseRuleEnum.templates, "Vorlagen")}
          <li className="list-group-item cursor-default">
            <div className="row">
              <div className="pl-2">Regeln</div>
            </div>
          </li>
          {[HouseRuleEnum.spell, HouseRuleEnum.weapon].map((template) => {
            switch (template) {
              case HouseRuleEnum.spell: {
                return renderListElement(template, "Zauber");
              }
              case HouseRuleEnum.weapon: {
                return renderListElement(template, "Waffen");
              }
              default: {
                return null;
              }
            }
          })}
        </ul>
      </div>
    </div>
  );
};

export default HouseRulesSidebar;
