import React from "react";
import SimpleLogo from "./Simplelogo";
import {
  AiOutlineHighlight,
  AiOutlineShopping,
  AiFillCamera,
  AiOutlineArrowLeft,
} from "react-icons/ai";

import { useSnapshot } from "valtio";
import { state } from "./Store";
import { motion, AnimatePresence } from 'framer-motion'

export default function Overlay() {
  const snap = useSnapshot(state);

  const transition = { type: 'spring', duration: 0.8 }

  const config = {
    initial: { x: -100, opacity: 0, transition: { ...transition, delay: 0.5 } },
    animate: { x: 0, opacity: 1, transition: { ...transition, delay: 0 } },
    exit: { x: -100, opacity: 0, transition: { ...transition, delay: 0 } }
  }

  return (
    <div className="container">
      <motion.header
             initial={{ opacity: 0, y: -120 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ type: 'spring', duration: 1.8, delay: 1 }}
      >
        <a href="https://joycreativecoder.github.io/3dconfigurator/">built with Joy 🖤</a>
        <AiOutlineShopping size="3em" />
      </motion.header>

      <AnimatePresence>
        {snap.intro ? (
           <Intro key="main" config={config} /> 
        ) : (
          <Customiser key="custom" config={config} />
        )}
      </AnimatePresence>
    </div>
  );
}

function Intro({ config }) {
  return (
    <motion.section {...config}>
      <div className="section--container">
        <div>
          <h1>LET'S DO IT.</h1>
        </div>
        <div className="support--content">
          <div>
            <p>
              Create your unique and exclusive shirt with our brand-new 3D
              customization tool. <strong>Unleash your imagination</strong> and
              define your own style.
            </p>
            <button
              style={{ background: "black" }}
              onClick={() => (state.intro = false)}
            >
              CUSTOMIZE IT <AiOutlineHighlight size="1.3em" />
            </button>
          </div>
        </div>
      </div>
    </motion.section>
  );
}

function Customiser({ config }) {
  const snap = useSnapshot(state);

  const colors = [
    "#ccc",
    "#EFBD4E",
    "#80C670",
    "#726DE8",
    "#EF674E",
    "#353934",
    "Purple",
  ];

  const decals = ["react", "three2", "pmndrs"];

  return (
    <motion.section {...config}>
      <div className="customizer">
        <div className="color-options">
          {colors.map((color) => (
            <div
              key={color}
              className="circle"
              style={{ background: color }}
              onClick={() => {
                state.selectedColor = color;
              }}
            ></div>
          ))}
        </div>
        <div className="decals">
          <div className="decals--container">
            {decals.map((decal) => (
              <div
                key={decal}
                className="decal"
                onClick={() => (state.selectedDecal = decal)}
              >
                <img
                  src={`${process.env.PUBLIC_URL}/${decal}_thumb.png`}
                  alt="brand"
                />
              </div>
            ))}
          </div>
        </div>
        <button
          className="share"
          style = {{ background: snap.selectedColor }}
          onClick = {() => {
            const link = document.createElement("a");
            link.setAttribute("download", "canvas.png");
            link.setAttribute(
              "href",
              document
                .querySelector("canvas")
                .toDataURL("image/png")
                .replace("image/png", "image/octet-stream")
            );
            link.click();
          }}
        >
          DOWNLOAD
          <AiFillCamera size="1.3em" />
        </button>
        <button
          className="exit"
          style={{ background: snap.selectedColor }}
          onClick={() => (state.intro = true)}
        >
          GO BACK
          <AiOutlineArrowLeft size="1.3em" />
        </button>
      </div>
    </motion.section>
  );
}
