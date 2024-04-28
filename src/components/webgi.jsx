import React, {
  useRef,
  useState,
  useCallback,
  forwardRef,
  useImperativeHandle,
  useEffect,
} from "react";
import {
  ViewerApp,
  AssetManagerPlugin,
  GBufferPlugin,
  ProgressivePlugin,
  TonemapPlugin,
  SSRPlugin,
  SSAOPlugin,
  BloomPlugin,
  GammaCorrectionPlugin,
  mobileAndTabletCheck,
} from "https://dist.pixotronics.com/webgi/runtime/bundle-0.9.2.mjs";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

const WebgiViewer = () => {
  const canvasRef = useRef(null);

  const setupViewer = useCallback(async () => {
    // Initialize the viewer
    const viewer = new ViewerApp({
      canvas: canvasRef.current,
    });

    const manager = await viewer.addPlugin(AssetManagerPlugin);
    await viewer.addPlugin(GBufferPlugin);
    await viewer.addPlugin(new ProgressivePlugin(32));
    await viewer.addPlugin(new TonemapPlugin(true));
    await viewer.addPlugin(GammaCorrectionPlugin);
    await viewer.addPlugin(SSRPlugin);
    await viewer.addPlugin(SSAOPlugin);
    await viewer.addPlugin(BloomPlugin);

    // Import and add a GLB file.
    viewer.renderer.refreshPipeline();
    await manager.addFromPath("mustangY.glb");
    viewer.getPlugin(TonemapPlugin).config.clipBackground = true;

    //viewer.scene.activeCamera.setCameraOptions({ controlsEnabled: false });

    window.scroll(0, 0);
  }, []);

  useEffect(() => {
    setupViewer();
  }, []);

  return (
    <div className="webgi-canvas-container">
      <canvas className="webgi-canvas" ref={canvasRef}></canvas>
    </div>
  );
};

export default WebgiViewer;
