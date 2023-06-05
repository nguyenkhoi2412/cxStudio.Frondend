import LogoSvg from "@assets/images/logo.svg";
import { navigateLocation } from "@routes/navigateLocation";

const Logo = () => {
  return (
    <>
      <a
        href={navigateLocation.DASHBOARD.DEFAULT}
        className="flex ml-2 md:mr-24"
      >
        <img src={LogoSvg} className="h-8 mr-3" alt="FlowBite Logo" />
        <span className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white">
          oSurvey
        </span>
      </a>
    </>
  );
};

export default Logo;
