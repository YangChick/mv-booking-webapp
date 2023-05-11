import _ from "lodash";
import forEach from "lodash/forEach";
import { toast } from "react-toastify";
import { history } from "../app/store";
import jwt_decode from "jwt-decode";
import { ROUTERS } from "../Contants";
import { transitions, positions, Provider as AlertProvider } from "react-alert";
import { useAlert } from "react-alert";
interface ILocationStructure {
  pathname: string;
  id: string;
  search?: object;
}
const Alert = (mess: string) => {
  const alert = useAlert();
  const msg = alert.show(mess);
  return msg;
};

const detectLocationBeforeRedirect = (location: string) => {
  // const userRole: ROLE.ADMIN | ROLE.EVENT_ADMIN | ROLE.USER = getUserRole();
  // if (userRole) {
  //   const allowLocation = LOCATIONS[userRole];
  //   if (!_.includes(allowLocation, location)) {
  //     Alert({
  //       type: 'ERROR',
  //       message:
  //         "Your account doesn't have permission to view or manage this page",
  //     });
  //     return { isValid: false, redirectLocation: REDIRECT[userRole] };
  //   }
  // }
  return { isValid: true, redirectLocation: location };
};

const redirect = (location: string | ILocationStructure) => {
  let findLocation;
  let newLocation;
  if (_.isString(location)) {
    const resolveLocation: string = location as string;
    findLocation = _.find(
      ROUTERS,
      (route: string) => route === resolveLocation,
    );
    newLocation = location;
  } else {
    const resolveLocation: ILocationStructure = location as ILocationStructure;
    const { pathname, id, search } = resolveLocation;
    findLocation = _.find(ROUTERS, (route: string) => route === pathname);
    newLocation = _.replace(pathname, ":id", id);
    if (search) {
      const generateSearch: string[] = [];
      forEach(search, (value: string, key: string) =>
        generateSearch.push(`${key}=${value}`),
      );
      const resolveSearch = generateSearch.join("&");
      newLocation += `?${resolveSearch}`;
    }
  }
  if (!findLocation) {
    return toast("WARNING");
  } else {
    const { isValid, redirectLocation } =
      detectLocationBeforeRedirect(findLocation);

    if (!isValid) return history.push(redirectLocation);
    return history.push(newLocation);
  }
};

const checkTokenLifeTime = (token: string | null, isShowAlert?: boolean) => {
  if (!token) {
    if (isShowAlert)
      // Alert({
      //   type: 'WARNING',
      //   message: 'Please login to continue...',
      // });
      Alert("Please login to continue...");
    return false;
  }

  try {
    const decodedToken: any = jwt_decode(token);
    const dateNow = new Date();
    if (decodedToken.exp < Math.floor(dateNow.getTime() / 1000)) {
      if (isShowAlert)
        // Alert({
        //   type: 'WARNING',
        //   message: 'Your token has been expired! ',
        // });
        Alert("Your token has been expired! ");
      return false;
    }
  } catch (error) {
    if (isShowAlert)
      // Alert({
      //   type: 'WARNING',
      //   message: 'Please login to continue...',
      // });
      Alert("Please login to continue.");
    return false;
  }

  return true;
};

export { redirect, checkTokenLifeTime };
