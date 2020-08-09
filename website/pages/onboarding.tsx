import { useState } from 'react';
import { StandardLayout } from "components/layouts/StandardLayout";
import { useRouter } from 'next/router'
import Link from 'next/link'

const Onboarding = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [timer, setTimer] = useState(null);
  const router = useRouter();
  const slidesArray: string[] = [
    'You can now do good by shopping online.<br/> But it <b>won’t happen automatically.</b>',
    'When you search for a website, you’ll see if it partners with Altruisto. Go to the website to start raising money while shopping (click on any link)',
    'When you go to the partner’s website, you’ll see the popup informing you that you can collect money when shopping on this website. Click:',
    'Awesome! 💪<br/> The donation at this website will be active for <b>24 hours</b>. If you want to see how much you’ve raised, search for shops or invite a friend, just click on the Altruisto icon at the top right corner. Try that yourself! ',
    'You rock it! 😎<br/>Now click on the social media icons to share Atruisto with friends. Together we can raise more!',
  ];
  const changeSlide:Function = (i) => {
    setActiveSlide(i);
    if(i === 4) {
      setTimer(setTimeout(()=>{ router.push('/welcome') },30000));
    } else {
      clearTimeout(timer);
    }
  }
  return (
    <StandardLayout noCta={true}>
        <div className="onboarding container">
          <div className="row onboarding__row">
            <div className="col-6 d-flex align-items-center">
              <img
                className="onboarding__image"
                src={`/images/onboarding${activeSlide}.png`}
                alt="onboarding slide image"
              />
            </div>
            <div className="col-6 d-flex flex-column justify-content-center">
              <img
                className="onboarding__logo"
                src="/images/logo.png"
                alt="altruisto logo"
              />
              <div className="onboarding__text">
                { activeSlide === 0 &&
                  <h3 className="onboarding__header">
                    Thank you for installing Altruisto.
                  </h3>
                }
                <p
                  className="onboarding__paragraph"
                  dangerouslySetInnerHTML={{__html: slidesArray[activeSlide]} }
                />
                { activeSlide === 2 &&
                  <div className="onboarding__button">
                    Activate donation
                  </div>
                }
                { activeSlide === 4 &&
                  <Link href="/welcome">
                    <button className="onboarding__button onboarding__button--redirect">
                      Go to Welcome Page
                    </button>
                  </Link>
                }
              </div>
              <ul className="onboarding__dots-list">
                {slidesArray.map((slide, index) => (
                  <li
                    key={'slide' + index}
                    onClick={() => changeSlide(index)}
                    className={`onboarding__dots-item " +
                      ${index === activeSlide ? "active" : ""}`
                    }
                  />
                ))}
              </ul>
            </div>
          </div>
        </div>
    </StandardLayout>
  );
}

export default Onboarding
