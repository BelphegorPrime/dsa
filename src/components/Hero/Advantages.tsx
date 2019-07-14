import React from "react";
import { Vantage } from "../../types";

interface AdvantageProps {
  advantages: Vantage[] | undefined;
  disadvantages: Vantage[] | undefined;
  className: string;
}

const Advantages = (props: AdvantageProps) => {
  const { advantages, disadvantages, className } = props;
  return (
    <div className={className}>
      <div className="pl-2 pt-2">
        <span className="font-weight-bold">Vorteile:</span>
        <div>
          {advantages
            ? advantages.map((advantage, i) => {
                const { name, value } = advantage;
                const isNotLast = advantages.length - 1 !== i;
                if (!value) {
                  return `${name}${isNotLast ? "," : ""} `;
                }
                return `${name} ${value || ""}${isNotLast ? "," : ""} `;
              })
            : null}
        </div>
      </div>
      <div className="pl-2 pt-2">
        <span className="font-weight-bold">Nachteile:</span>
        <div className="font-italic">
          {disadvantages
            ? disadvantages.map((advantage, i) => {
                const { name, value } = advantage;
                const isNotLast = disadvantages.length - 1 !== i;
                if (!value) {
                  return `${name}${isNotLast ? "," : ""} `;
                }
                return `${name} ${value || ""}${isNotLast ? "," : ""} `;
              })
            : null}
        </div>
      </div>
    </div>
  );
};

export default Advantages;
