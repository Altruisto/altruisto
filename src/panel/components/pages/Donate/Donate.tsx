import React, { useMemo } from "react";
import IconBox from "../../ui/IconBox";
import { WalletIcon } from "../../icons/WalletIcon";
import transformUsdToBeingsSaved from "../../../common/utils/transform-usd-to-beings-saved";

enum Views {
  PartnerNotActivated,
  PartnerActivated,
  NotAPartner
}

export const Donate: React.FC = () => {
  const getRandomImpactHighlight = () => {
    function asLiterals<T extends string>(arr: T[]): T[] {
      return arr;
    }
    const charities = asLiterals(["AMF", "SCI"]);
    const randomItem = Math.floor(Math.random() * charities.length);
    const beingsSaved = transformUsdToBeingsSaved(
      100 * 0.03,
      charities[randomItem]
    );

    switch (charities[randomItem]) {
      case "AMF":
        return `protect ${beingsSaved} ${
          beingsSaved === 1 ? "person" : "people"
        } from malaria`;

      case "SCI":
        return `${beingsSaved} children get cured from parasites`;
    }
  };

  const memoizedImpactHighlight = useMemo(() => getRandomImpactHighlight(), []);

  return (
    <div className="page">
      <div className="container fill-height">
        <div className="page__title m-b-0">
          <h1>Help others</h1>
          <h1 className="text-gradient">with just one click!</h1>
        </div>
        <div className="justify-center fill-height">
          <button className="button m-b-20">
            Activate donation for:
            <br />
            ebay.com
          </button>
          <div className="d-flex justify-space-between">
            <span>
              This site is our <strong className="text-accent">partner!</strong>
            </span>
            <a
              href="https://altruisto.com/partners"
              className="uppercase-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              View All
            </a>
          </div>
        </div>
      </div>
      <IconBox icon={<WalletIcon />}>
        For every <strong>$100</strong> you spent with ebay you help:
        <br />
        <strong>{memoizedImpactHighlight}</strong>
      </IconBox>
    </div>
  );
};
