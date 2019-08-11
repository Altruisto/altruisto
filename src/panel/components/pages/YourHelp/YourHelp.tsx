import React, { useEffect, useState } from "react"
import LinearProgress from "@material-ui/core/LinearProgress"
import { withStyles } from "@material-ui/core/styles"
import { useAuthContext } from "../../../common/auth"
import Tile from "../../ui/Tile"
import transformUsdToBeingsSaved, {
  IMPACT_COST_IN_USD,
  spreadUSDBetweenAllForMaxImpact
} from "../../../common/utils/transform-usd-to-beings-saved"
import mosquito from "../../../assets/mosquito.svg"
import medicine from "../../../assets/medicine.svg"
import family from "../../../assets/family.svg"

type Props = {
  onRequestLogin: () => void
  isActive: boolean
}

const StyledLinearProgress = withStyles({
  determinate: {
    backgroundColor: "lightgrey",
    height: 6,
    borderRadius: 4
  }
})(LinearProgress)

const ProgressBar = props => {
  const [timedValue, setTimedValue] = useState(0)
  const { value, ...rest } = props
  useEffect(() => {
    setTimeout(() => {
      setTimedValue(value)
    }, 300)
  }, [])

  return <StyledLinearProgress value={timedValue} {...rest} />
}

// TODO: put the correct url for "FIND OUT WHY" link
export const YourHelp: React.FC<Props> = (props: Props) => {
  const auth = useAuthContext()
  const moneyRaised = 1

  const [impact, moneyLeft] = spreadUSDBetweenAllForMaxImpact(moneyRaised)

  return (
    <div className="page">
      <div className="container fill-height">
        <div className="justify-center fill-height">
          {auth.isLoggedIn ? (
            <>
              {moneyRaised === 0 ? (
                <>
                  <h2 className="text-center">
                    Make your first purchase with Altruisto to see how much
                    impact you can have!
                  </h2>
                  <a
                    href="https://altruisto.com/partners"
                    target="_blank"
                    rel="noreferrer noopener"
                  >
                    <button className="button m-b-20">
                      See the shops you can start helping with
                    </button>
                  </a>
                  <p className="text-center">
                    Some puchases take up to several weeks to be processed{" "}
                  </p>
                  <a
                    href="https://altruisto.com/purchase-processing"
                    target="_blank"
                    rel="noreferrer noopener"
                    className="button-link uppercase-link m-b-20 text-center"
                  >
                    FIND OUT WHY
                  </a>
                </>
              ) : (
                <div className="fill-height">
                  <div className="col-6">
                    <div className="page__title m-b-0">
                      <h1>Your help:</h1>
                    </div>
                    {impact["SCI"] ? (
                      <Tile
                        title={String(impact["SCI"])}
                        icon={
                          <img
                            src={medicine}
                            style={{
                              maxHeight: "24px",
                              maxWidth: "24px",
                              minHeight: "24px",
                              minWidth: "24px"
                            }}
                          />
                        }
                        className="m-b-20"
                      >
                        children <strong>cured from parasites</strong>
                      </Tile>
                    ) : (
                      <>
                        <strong>
                          You are so close to helping first person!
                        </strong>
                        <br />
                        <span>
                          Collect another $
                          {Math.round(
                            (IMPACT_COST_IN_USD["SCI"] - moneyLeft) * 100
                          ) / 100}{" "}
                          to help cure first child from parasites
                        </span>
                        {props.isActive ? (
                          <ProgressBar
                            color="secondary"
                            variant="determinate"
                            value={Math.round(
                              (moneyLeft / IMPACT_COST_IN_USD["SCI"]) * 100
                            )}
                            className="m-t-10"
                          />
                        ) : null}
                      </>
                    )}

                    {impact["AMF"] ? (
                      <Tile
                        title={String(impact["AMF"])}
                        icon={
                          <img
                            src={mosquito}
                            style={{
                              maxHeight: "24px",
                              maxWidth: "24px",
                              minHeight: "24px",
                              minWidth: "24px"
                            }}
                          />
                        }
                        className="m-b-20"
                      >
                        people <strong>protected from malaria</strong>
                      </Tile>
                    ) : null}

                    {impact["GD"] ? (
                      <Tile
                        title={String(impact["GD"])}
                        icon={
                          <img
                            src={family}
                            style={{
                              maxHeight: "24px",
                              maxWidth: "24px",
                              minHeight: "24px",
                              minWidth: "24px"
                            }}
                          />
                        }
                        className="m-b-20"
                      >
                        weeks of aid for 1 family living{" "}
                        <strong>in extreme poverty</strong>
                      </Tile>
                    ) : null}
                  </div>
                  <div className="col-6">
                    <h1>
                      You have collected:{" "}
                      <span className="text-gradient">${moneyRaised}</span>
                    </h1>
                    <p>
                      Some puchases take up to several weeks to be processed{" "}
                    </p>
                    <a
                      href="https://altruisto.com/purchase-processing"
                      target="_blank"
                      rel="noreferrer noopener"
                      className="button-link uppercase-link m-b-20"
                    >
                      FIND OUT WHY
                    </a>
                  </div>
                </div>
              )}
            </>
          ) : (
            <>
              <h2 className="text-center">
                To see the exact impact you had with your online shopping you
                need to sign up.
              </h2>
              <button
                className="button m-b-20"
                onClick={() => props.onRequestLogin && props.onRequestLogin()}
              >
                Sign up
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
