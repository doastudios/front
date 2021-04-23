import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { vec2 } from "gl-matrix";

export const Fly = () => {
  const initOrigin = () => {
    const vec = vec2.create();
    vec2.set(
      vec,
      Math.random() * window.screen.width,
      Math.random() * window.screen.height
    );
    return vec;
  };
  const [origin] = useState(initOrigin());
  const [mouseVec, setMouseVec] = useState(vec2.create());
  const [flyVec, setFlyVec] = useState(vec2.create());

  const trackMouse = () => {
    function handleMouseMove(event: Event) {
      const newMouseVec = vec2.create();
      let eventDoc: {
        documentElement: any;
        body: {
          scrollLeft: any;
          clientLeft: any;
          scrollTop: any;
          clientTop: any;
        };
      };
      let doc: {
        scrollLeft: any;
        clientLeft: any;
        scrollTop: any;
        clientTop: any;
      };
      let body: {
        scrollLeft: any;
        clientLeft: any;
        scrollTop: any;
        clientTop: any;
      };

      event = event || window.event; // IE-ism

      // If pageX/Y aren't available and clientX/Y are,
      // calculate pageX/Y - logic taken from jQuery.
      // (This is to support old IE)
      if (event.pageX == null && event.clientX != null) {
        eventDoc = (event.target && event.target.ownerDocument) || document;
        doc = eventDoc.documentElement;
        body = eventDoc.body;

        event.pageX =
          event.clientX +
          ((doc && doc.scrollLeft) || (body && body.scrollLeft) || 0) -
          ((doc && doc.clientLeft) || (body && body.clientLeft) || 0);
        event.pageY =
          event.clientY +
          ((doc && doc.scrollTop) || (body && body.scrollTop) || 0) -
          ((doc && doc.clientTop) || (body && body.clientTop) || 0);
      }
      vec2.set(newMouseVec, event.pageX, event.pageY);
      setMouseVec(newMouseVec);
    }
    document.onmousemove = handleMouseMove;
  };

  useEffect(() => {
    trackMouse();
  }, []);

  const renderVec = vec2.create();
  const nearness =
    1 /
    Math.min(
      1,
      vec2.distance(mouseVec, flyVec) /
        Math.sqrt(
          Math.pow(window.screen.width, 2) + Math.pow(window.screen.height, 2)
        )
    );

  const magnitudeVec = vec2.create();
  vec2.scale(
    magnitudeVec,
    vec2.normalize(
      magnitudeVec,
      vec2.scale(
        magnitudeVec,
        vec2.subtract(magnitudeVec, mouseVec, flyVec),
        -0.5
      )
    ),
    nearness * 50
  );
  const newFlyVec = vec2.create();
  vec2.add(newFlyVec, flyVec, magnitudeVec);
  useEffect(() => {
    setFlyVec(newFlyVec);
  }, [newFlyVec]);
  vec2.add(renderVec, newFlyVec, origin);

  // TODO springy magnitude
  // TODO place image anywhere on screen
  const Div: ReactJSXElement = styled.div({
    position: "absolute",
    top: renderVec[0],
    left: renderVec[1],
  });

  return (
    <Div>
      <img className="h-64 " src="/images/Tommy_Wiseau_in_2017.png" />
    </Div>
  );
};

export default Fly;
