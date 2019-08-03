import React, { useState } from "react";
import { withStyles } from "@material-ui/core/styles";
import { useAuthContext } from "./common/auth";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import SwipeableViews from "react-swipeable-views";
import { Header } from "./components/Header";
import Paper from "@material-ui/core/Paper";
import { SettingsIcon } from "./components/icons/SettingsIcon";
import { ShareIcon } from "./components/icons/ShareIcon";
import { WalletIcon } from "./components/icons/WalletIcon";
import { ProfileIcon } from "./components/icons/ProfileIcon";
import { LoginOrRegister } from "./components/pages/LoginOrRegister/LoginOrRegister";
import { Share } from "./components/pages/Share/Share";
import { Donate } from "./components/pages/Donate/Donate";
import { Settings } from "./components/pages/Settings/Settings";

type Props = {
  classes: {
    tab: string;
  };
};

const styles = () => ({
  tab: {
    minWidth: "unset",
    "text-transform": "none",
    "font-size": "12px"
  }
});

const Main: React.FC<Props> = (props: Props) => {
  const auth = useAuthContext();
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const [activeTab, setActiveTab] = useState(0);

  const { classes } = props;

  return (
    <>
      {showLoginPopup ? (
        <LoginOrRegister onClose={() => setShowLoginPopup(false)} />
      ) : null}

      <Header
        user={auth.isLoggedIn ? auth.user : undefined}
        onLoginOrRegisterClick={() => setShowLoginPopup(true)}
      />
      <div className="app__content-wrapper">
        <SwipeableViews
          // axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
          index={activeTab}
          className="fill-height"
          containerStyle={{
            height: "100%",
            display: "flex"
          }}
          slideStyle={{
            display: "flex"
          }}
          // onChangeIndex={this.handleChangeIndex}
        >
          <Share />
          <Donate />
          <div>Your Help</div>
          <Settings onRequestLogin={() => setShowLoginPopup(true)} />
        </SwipeableViews>
      </div>
      <Paper square elevation={0}>
        <Tabs
          value={activeTab}
          onChange={(event: React.ChangeEvent<{}>, value: number) =>
            setActiveTab(value)
          }
          indicatorColor="none"
          variant="fullWidth"
          textColor="secondary"
        >
          <Tab
            className={classes.tab}
            icon={<ShareIcon />}
            label="Share"
            disableRipple
          />
          <Tab
            className={classes.tab}
            icon={<WalletIcon />}
            label="Donate"
            disableRipple
          />
          <Tab
            className={classes.tab}
            icon={<ProfileIcon />}
            label="Your help"
            disableRipple
          />
          <Tab
            className={classes.tab}
            icon={<SettingsIcon />}
            label="Settings"
            disableRipple
          />
        </Tabs>
      </Paper>
    </>
  );
};

export default withStyles(styles)(Main);
