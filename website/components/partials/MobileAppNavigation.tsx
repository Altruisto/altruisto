import Share from "components/ui/icons/Share"

export const MobileAppNavigation = () => {
  return (
    <div className="mobile-app__navigation">
      <div className="mobile-app__nav-item">
        <div>
          <Share />
        </div>
        Share
      </div>
      <div className="mobile-app__nav-item">
        <div>
          <img src="/images/donate.svg" />
        </div>
        Shop
      </div>
      <div className="mobile-app__nav-item">
        <div>
          <img src="/images/your-help.svg" />
        </div>
        Your Help
      </div>
      <div className="mobile-app__nav-item">
        <div>
          <img src="/images/settings.svg" />
        </div>
        Settings
      </div>
    </div>
  )
}
