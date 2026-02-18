import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";

export const AboutWin = () => {
  const { abOpen } = useSelector((state) => state.desktop);
  const { locked, booted } = useSelector((state) => state.wallpaper);
  const [open, setOpen] = useState(
    true && import.meta.env.MODE != "development",
  );
  const [timer, setTimer] = useState(
    localStorage.getItem("closeAbout") == "true" ? 0 : 5,
  );
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();

  const action = () => {
    setOpen(false);
    localStorage.setItem("closeAbout", true);
    dispatch({ type: "DESKABOUT", payload: false });
  };

  useEffect(() => {
    if (timer > 0 && !locked && booted) {
      setTimeout(() => {
        setTimer(timer - 1);
      }, 1000);
    }
  }, [timer, locked, booted]);

  return open || abOpen ? (
    <div className="aboutApp floatTab dpShad">
      <div className="content p-6">
        <div className="text-xl font-semibold">Welcome to my Portfolio</div>
        <p>
          This is an interactive Windows 11-style portfolio built with React.
        </p>
        <p>
          Explore my projects through the <b>Portfolio</b> app, or reach out via
          the <b>Contact Me</b> app.
        </p>
        <p className="pl-4">
          Contact :&nbsp;
          <a target="_blank" href="mailto:rahmat.wibowo21@gmail.com" rel="noreferrer">
            rahmat.wibowo21@gmail.com
          </a>
        </p>
        <p>
          Connect with me on&nbsp;
          <a
            target="_blank"
            href="https://www.linkedin.com/in/rahmatwibowo/"
            rel="noreferrer"
          >
            LinkedIn
          </a>
          .
        </p>
      </div>
      <div className="okbtn px-6 py-4">
        <div data-allow={timer == 0} onClick={timer == 0 && action}>
          {t("about.understand")}{" "}
          {timer > 0 ? <span>{`( ${timer} )`}</span> : null}
        </div>
      </div>
    </div>
  ) : null;
};
