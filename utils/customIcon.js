import React from "react";
import SvgIcon from "@material-ui/core/SvgIcon";

const wrapSvgPath = (path, viewBox = "0 0 50 50") => (props) => (
    <SvgIcon {...props} viewBox={viewBox}>{path}</SvgIcon>
);

const GoogleIcon = wrapSvgPath(
    <path d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z" />
);

export default GoogleIcon;