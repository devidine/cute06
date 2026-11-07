/**
 * VERTEXLAB // ALL-IN-ONE 3D ENGINE & FULL-STACK PORTFOLIO
 * Interactive UI, 3D Engine Canvas Simulator, Render Compare Slider & Quote Configurator
 */

document.addEventListener("DOMContentLoaded", () => {
  /* ========================================================================
     1. SLEEK PRELOADER & INITIAL REVEAL
     ======================================================================== */
  const preloader = document.getElementById("preloader");
  const preloaderFill = document.getElementById("preloaderFill");
  const preloaderPercent = document.getElementById("preloaderPercent");

  let loadProgress = 0;
  const loaderInterval = setInterval(() => {
    loadProgress += Math.floor(Math.random() * 28) + 22;
    if (loadProgress >= 100) {
      loadProgress = 100;
      clearInterval(loaderInterval);
      if (preloaderFill) preloaderFill.style.width = "100%";
      if (preloaderPercent) preloaderPercent.textContent = "100%";
      setTimeout(() => {
        if (preloader) preloader.classList.add("is-hidden");
        triggerInitialReveals();
      }, 220);
    } else {
      if (preloaderFill) preloaderFill.style.width = `${loadProgress}%`;
      if (preloaderPercent) preloaderPercent.textContent = `${loadProgress}%`;
    }
  }, 70);

  /* ========================================================================
     2. SCROLL REVEAL CHOREOGRAPHY (INTERSECTION OBSERVER)
     ======================================================================== */
  const revealElements = document.querySelectorAll(".reveal-up");

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
  );

  function triggerInitialReveals() {
    revealElements.forEach((el) => revealObserver.observe(el));
  }

  /* ========================================================================
     3. THEME SWITCHER (DARK / LIGHT)
     ======================================================================== */
  const themeToggle = document.getElementById("themeToggle");
  const htmlEl = document.documentElement;

  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      const current = htmlEl.getAttribute("data-theme") || "dark";
      const next = current === "dark" ? "light" : "dark";
      htmlEl.setAttribute("data-theme", next);
    });
  }

  /* ========================================================================
     4. CUSTOM CURSOR & MAGNETIC BUTTONS
     ======================================================================== */
  const cursorDot = document.getElementById("cursorDot");
  const cursorRing = document.getElementById("cursorRing");

  if (window.matchMedia("(pointer: fine)").matches && cursorDot && cursorRing) {
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let ringX = mouseX;
    let ringY = mouseY;

    window.addEventListener("mousemove", (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursorDot.style.left = `${mouseX}px`;
      cursorDot.style.top = `${mouseY}px`;
    });

    const renderCursor = () => {
      ringX += (mouseX - ringX) * 0.18;
      ringY += (mouseY - ringY) * 0.18;
      cursorRing.style.left = `${ringX}px`;
      cursorRing.style.top = `${ringY}px`;
      requestAnimationFrame(renderCursor);
    };
    requestAnimationFrame(renderCursor);

    const interactiveTargets = document.querySelectorAll(
      "a, button, input, select, textarea, .artwork-media, .compare-stage"
    );
    interactiveTargets.forEach((el) => {
      el.addEventListener("mouseenter", () => document.body.classList.add("cursor-hover"));
      el.addEventListener("mouseleave", () => document.body.classList.remove("cursor-hover"));
    });
  }

  /* ========================================================================
     5. HERO 3D RENDER VIEWPORT & SCENE TELEMETRY SWITCHER
     ======================================================================== */
  const sceneData = [
    {
      code: "SCENE_01 // VOLUMETRIC_SUNSET_CLOSEUP.RND",
      src: "assets/render-sunset-closeup.jpg",
      lightboxTitle: "SCENE 01 // GOLDEN HOUR VOLUMETRIC CLOSEUP",
      lightboxDesc:
        "태양광 산란(God Rays), 나뭇잎 투과광, 고양이 털 림 라이트(Rim Light) 및 고밀도 잔디 인스턴싱을 구현한 클로즈업 렌더링입니다.",
      pins: [
        {
          top: "28%",
          left: "48%",
          tag: "GOD RAYS // HDR",
          title: "Volumetric God Rays",
          desc: "태양광 산란(Crepuscular Rays) 및 HDR 블룸 포스트 프로세싱 패스"
        },
        {
          top: "66%",
          left: "72%",
          tag: "GPU GRASS INSTANCING",
          title: "GPU Foliage Instancing",
          desc: "수만 개의 잔디 블레이드 GPU 하드웨어 인스턴싱 및 바람 버텍스 셰이더"
        },
        {
          top: "74%",
          left: "38%",
          tag: "BLENDER PBR ASSET",
          title: "Blender 3D Asset & PBR",
          desc: "블렌더 하이폴리 모델링, 털/패브릭 셰이딩 및 서브서피스 스캐터링"
        }
      ]
    },
    {
      code: "SCENE_02 // GOLDEN_MEADOW_WIDE_VISTA.RND",
      src: "assets/render-sunset-wide.jpg",
      lightboxTitle: "SCENE 02 // GOLDEN MEADOW WIDE ENVIRONMENT",
      lightboxDesc:
        "원목 테이블과 체크 패브릭 클로스 시뮬레이션 에셋, 원경 산악 지형과 석양 렌즈 플레어를 조화롭게 담아낸 와이드 씬입니다.",
      pins: [
        {
          top: "52%",
          left: "24%",
          tag: "DISTANT TERRAIN LOD",
          title: "Mountain Terrain & Fog",
          desc: "원경 산악 지형 하이트맵 스플래팅 및 거리 기반 대기 안개(Atmospheric Fog)"
        },
        {
          top: "73%",
          left: "46%",
          tag: "CLOTH & PROP SIM",
          title: "Blender Cloth & Table Prop",
          desc: "블렌더 클로스 물리 시뮬레이션으로 제작한 테이블보 주름 및 원목 PBR 프롭"
        },
        {
          top: "26%",
          left: "72%",
          tag: "ANAMORPHIC FLARE",
          title: "Golden Hour Sun & Lens Flare",
          desc: "물리 기반 태양광 각도 연산 및 아나모픽 렌즈 플레어 셰이더"
        }
      ]
    },
    {
      code: "SCENE_03 // ALPINE_DAYLIGHT_TERRAIN.RND",
      src: "assets/render-alpine-day.jpg",
      lightboxTitle: "SCENE 03 // ALPINE DAYLIGHT OPEN WORLD",
      lightboxDesc:
        "실시간 볼류메트릭 구름, 경사도 기반 암석·초지 절차적 배치, 방향성 바람 필드가 적용된 고원 주간 오픈월드 환경입니다.",
      pins: [
        {
          top: "24%",
          left: "56%",
          tag: "VOLUMETRIC CLOUDS",
          title: "Raymarched Volumetric Sky",
          desc: "풍부한 입체감과 자연스러운 하늘 빛 산란을 제공하는 볼류메트릭 클라우드"
        },
        {
          top: "68%",
          left: "48%",
          tag: "PROCEDURAL ROCK & GRASS",
          title: "Slope-Based Terrain Splatting",
          desc: "지형 경사도와 고도에 따라 암석과 잔디가 자연스럽게 섞이는 절차적 레이어"
        },
        {
          top: "46%",
          left: "16%",
          tag: "CONIFER FOLIAGE LOD",
          title: "Multi-LOD Forest System",
          desc: "침엽수 및 활엽수 식생 클러스터링과 거리별 LOD 최적화로 고프레임 유지"
        }
      ]
    }
  ];

  const heroImages = document.querySelectorAll(".hero-render-img");
  const sceneTabs = document.querySelectorAll(".scene-tab");
  const heroSceneCode = document.getElementById("heroSceneCode");
  const hudPinsLayer = document.getElementById("hudPinsLayer");
  const hudReadoutTitle = document.getElementById("hudReadoutTitle");
  const hudReadoutDesc = document.getElementById("hudReadoutDesc");
  const openHeroLightboxBtn = document.getElementById("openHeroLightbox");
  const liveFpsCounter = document.getElementById("liveFpsCounter");

  let activeSceneIndex = 0;

  // Subtle realistic FPS telemetry fluctuation (118 ~ 124 FPS)
  if (liveFpsCounter) {
    setInterval(() => {
      const fps = 118 + Math.floor(Math.random() * 7);
      liveFpsCounter.textContent = String(fps);
    }, 1400);
  }

  function renderHudPins(sceneIdx) {
    if (!hudPinsLayer) return;
    const data = sceneData[sceneIdx];
    hudPinsLayer.innerHTML = "";

    data.pins.forEach((pin, idx) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = `hud-pin ${idx === 0 ? "active" : ""}`;
      btn.style.top = pin.top;
      btn.style.left = pin.left;
      btn.innerHTML = `
        <span class="hud-pin-ring"></span>
        <span class="hud-pin-dot"></span>
        <span class="hud-pin-tag">${pin.tag}</span>
      `;
      btn.addEventListener("click", () => {
        hudPinsLayer.querySelectorAll(".hud-pin").forEach((p) => p.classList.remove("active"));
        btn.classList.add("active");
        if (hudReadoutTitle) hudReadoutTitle.textContent = pin.title.toUpperCase();
        if (hudReadoutDesc) hudReadoutDesc.textContent = pin.desc;
      });
      btn.addEventListener("mouseenter", () => {
        if (hudReadoutTitle) hudReadoutTitle.textContent = pin.title.toUpperCase();
        if (hudReadoutDesc) hudReadoutDesc.textContent = pin.desc;
      });
      hudPinsLayer.appendChild(btn);
    });

    if (data.pins[0]) {
      if (hudReadoutTitle) hudReadoutTitle.textContent = data.pins[0].title.toUpperCase();
      if (hudReadoutDesc) hudReadoutDesc.textContent = data.pins[0].desc;
    }
  }

  function switchHeroScene(index) {
    activeSceneIndex = index;
    heroImages.forEach((img, i) => {
      img.classList.toggle("active", i === index);
    });
    sceneTabs.forEach((tab, i) => {
      const isSelected = i === index;
      tab.classList.toggle("active", isSelected);
      tab.setAttribute("aria-selected", String(isSelected));
    });
    if (heroSceneCode && sceneData[index]) {
      heroSceneCode.textContent = sceneData[index].code;
    }
    renderHudPins(index);
  }

  sceneTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const target = Number(tab.getAttribute("data-scene-target") || 0);
      switchHeroScene(target);
    });
  });

  renderHudPins(0);

  /* ========================================================================
     6. INTERACTIVE BEFORE/AFTER RENDER COMPARISON SLIDER
     ======================================================================== */
  const compareStage = document.getElementById("compareStage");
  const compareOverlay = document.getElementById("compareOverlay");
  const compareHandle = document.getElementById("compareHandle");
  const beforeImg = compareOverlay ? compareOverlay.querySelector(".compare-img-before") : null;

  function syncBeforeImageWidth() {
    if (compareStage && beforeImg) {
      beforeImg.style.width = `${compareStage.clientWidth}px`;
    }
  }

  window.addEventListener("resize", syncBeforeImageWidth);
  syncBeforeImageWidth();

  function setComparePosition(percent) {
    const clamped = Math.max(4, Math.min(96, percent));
    if (compareOverlay) compareOverlay.style.width = `${clamped}%`;
    if (compareHandle) {
      compareHandle.style.left = `${clamped}%`;
      compareHandle.setAttribute("aria-valuenow", String(Math.round(clamped)));
    }
  }

  if (compareStage) {
    let isDraggingCompare = false;

    const updateFromClientX = (clientX) => {
      const rect = compareStage.getBoundingClientRect();
      const pct = ((clientX - rect.left) / rect.width) * 100;
      setComparePosition(pct);
    };

    compareStage.addEventListener("mousedown", (e) => {
      isDraggingCompare = true;
      updateFromClientX(e.clientX);
    });

    window.addEventListener("mousemove", (e) => {
      if (!isDraggingCompare) return;
      updateFromClientX(e.clientX);
    });

    window.addEventListener("mouseup", () => {
      isDraggingCompare = false;
    });

    compareStage.addEventListener(
      "touchstart",
      (e) => {
        if (e.touches.length > 0) {
          updateFromClientX(e.touches[0].clientX);
        }
      },
      { passive: true }
    );

    compareStage.addEventListener(
      "touchmove",
      (e) => {
        if (e.touches.length > 0) {
          updateFromClientX(e.touches[0].clientX);
        }
      },
      { passive: true }
    );

    if (compareHandle) {
      compareHandle.addEventListener("keydown", (e) => {
        const current = Number(compareHandle.getAttribute("aria-valuenow") || 50);
        if (e.key === "ArrowLeft") {
          e.preventDefault();
          setComparePosition(current - 5);
        } else if (e.key === "ArrowRight") {
          e.preventDefault();
          setComparePosition(current + 5);
        }
      });
    }
  }

  /* ========================================================================
     7. REAL-TIME 3D ENGINE & SHADER CANVAS SIMULATOR (#engineCanvas)
     ======================================================================== */
  const engineCanvas = document.getElementById("engineCanvas");
  const shaderBtns = document.querySelectorAll(".shader-btn");
  const hudVertCount = document.getElementById("hudVertCount");
  const hudModeName = document.getElementById("hudModeName");
  const codePreviewText = document.getElementById("codePreviewText");

  const shaderSnippets = {
    wireframe: `// DirectX 11 Custom Render Pass & Wireframe Rasterizer
void D3D11Renderer::BindWireframeState(ID3D11DeviceContext* ctx) {
    ctx->RSSetState(m_wireframeRasterizerState.Get());
    ctx->IASetPrimitiveTopology(D3D11_PRIMITIVE_TOPOLOGY_TRIANGLELIST);
    ctx->VSSetShader(m_meshTransformVS.Get(), nullptr, 0);
    ctx->DrawIndexed(m_meshIndexCount, 0, 0);
}`,
    normals: `// HLSL 5.0 Vertex Normal & Directional Rim Lighting Pass
float4 PS_NormalLitPass(VS_OUTPUT input) : SV_TARGET {
    float3 N = normalize(input.worldNormal);
    float3 L = normalize(float3(0.6f, 0.8f, -0.5f));
    float ndotl = saturate(dot(N, L)) * 0.75f + 0.25f;
    float3 normalColor = N * 0.5f + 0.5f;
    return float4(normalColor * ndotl, 1.0f);
}`,
    terrain: `// GPU Procedural Terrain Heightmap & Wind Displacement VS
VS_OUTPUT VS_TerrainWindField(VS_INPUT vin) {
    VS_OUTPUT vout;
    float wave = sin(vin.pos.x * 1.8f + g_Time * 2.2f) * cos(vin.pos.z * 1.8f + g_Time);
    vin.pos.y += wave * 0.45f; // Real-time Height Displacement
    vout.posH = mul(float4(vin.pos, 1.0f), g_WorldViewProj);
    return vout;
}`
  };

  if (engineCanvas) {
    const ctx = engineCanvas.getContext("2d");
    let currentShaderMode = "wireframe";
    let rotX = 0.42;
    let rotY = 0.65;
    let isDraggingCanvas = false;
    let lastX = 0;
    let lastY = 0;
    let timeAcc = 0;

    shaderBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        shaderBtns.forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
        currentShaderMode = btn.getAttribute("data-shader-mode") || "wireframe";

        if (hudModeName) hudModeName.textContent = currentShaderMode.toUpperCase();
        if (hudVertCount) {
          hudVertCount.textContent = currentShaderMode === "terrain" ? "1,600" : "1,152";
        }
        if (codePreviewText && shaderSnippets[currentShaderMode]) {
          codePreviewText.textContent = shaderSnippets[currentShaderMode];
        }
      });
    });

    engineCanvas.addEventListener("mousedown", (e) => {
      isDraggingCanvas = true;
      lastX = e.clientX;
      lastY = e.clientY;
    });

    window.addEventListener("mousemove", (e) => {
      if (!isDraggingCanvas) return;
      const dx = e.clientX - lastX;
      const dy = e.clientY - lastY;
      rotY += dx * 0.008;
      rotX = Math.max(-1.2, Math.min(1.2, rotX + dy * 0.008));
      lastX = e.clientX;
      lastY = e.clientY;
    });

    window.addEventListener("mouseup", () => {
      isDraggingCanvas = false;
    });

    engineCanvas.addEventListener(
      "touchstart",
      (e) => {
        if (e.touches.length === 1) {
          isDraggingCanvas = true;
          lastX = e.touches[0].clientX;
          lastY = e.touches[0].clientY;
        }
      },
      { passive: true }
    );

    engineCanvas.addEventListener(
      "touchmove",
      (e) => {
        if (!isDraggingCanvas || e.touches.length !== 1) return;
        const dx = e.touches[0].clientX - lastX;
        const dy = e.touches[0].clientY - lastY;
        rotY += dx * 0.008;
        rotX = Math.max(-1.2, Math.min(1.2, rotX + dy * 0.008));
        lastX = e.touches[0].clientX;
        lastY = e.touches[0].clientY;
      },
      { passive: true }
    );

    window.addEventListener("touchend", () => {
      isDraggingCanvas = false;
    });

    // Generate Torus Geometry for Wireframe & Normals Mode
    function buildTorusGeometry(R = 1.35, r = 0.55, segU = 32, segV = 18) {
      const vertices = [];
      const faces = [];
      for (let i = 0; i <= segU; i++) {
        const u = (i / segU) * Math.PI * 2;
        for (let j = 0; j <= segV; j++) {
          const v = (j / segV) * Math.PI * 2;
          const x = (R + r * Math.cos(v)) * Math.cos(u);
          const y = r * Math.sin(v);
          const z = (R + r * Math.cos(v)) * Math.sin(u);
          vertices.push({ x, y, z });
        }
      }
      const stride = segV + 1;
      for (let i = 0; i < segU; i++) {
        for (let j = 0; j < segV; j++) {
          const a = i * stride + j;
          const b = (i + 1) * stride + j;
          const c = (i + 1) * stride + (j + 1);
          const d = i * stride + (j + 1);
          faces.push([a, b, c, d]);
        }
      }
      return { vertices, faces };
    }

    const torusMesh = buildTorusGeometry();

    function project3D(pt, width, height) {
      // Rotate Y
      const cosY = Math.cos(rotY);
      const sinY = Math.sin(rotY);
      const x1 = pt.x * cosY - pt.z * sinY;
      const z1 = pt.z * cosY + pt.x * sinY;

      // Rotate X
      const cosX = Math.cos(rotX);
      const sinX = Math.sin(rotX);
      const y2 = pt.y * cosX - z1 * sinX;
      const z2 = z1 * cosX + pt.y * sinX;

      const fov = 440;
      const dist = 4.4;
      const scale = fov / (dist + z2);
      return {
        sx: width / 2 + x1 * scale,
        sy: height / 2 - y2 * scale,
        z: z2,
        x1,
        y2
      };
    }

    function renderEngineFrame() {
      if (!ctx) return;
      const w = engineCanvas.width;
      const h = engineCanvas.height;
      timeAcc += 0.022;

      if (!isDraggingCanvas) {
        rotY += 0.0045;
      }

      // Clear background with subtle studio grid
      ctx.fillStyle = "#07090e";
      ctx.fillRect(0, 0, w, h);

      ctx.strokeStyle = "rgba(255, 255, 255, 0.03)";
      ctx.lineWidth = 1;
      for (let gx = 0; gx < w; gx += 40) {
        ctx.beginPath();
        ctx.moveTo(gx, 0);
        ctx.lineTo(gx, h);
        ctx.stroke();
      }
      for (let gy = 0; gy < h; gy += 40) {
        ctx.beginPath();
        ctx.moveTo(0, gy);
        ctx.lineTo(w, gy);
        ctx.stroke();
      }

      if (currentShaderMode === "terrain") {
        // Render 3D Procedural Wave Terrain Grid
        const gridN = 26;
        const size = 2.9;
        const projectedGrid = [];

        for (let i = 0; i < gridN; i++) {
          projectedGrid[i] = [];
          for (let j = 0; j < gridN; j++) {
            const gx = (i / (gridN - 1) - 0.5) * size;
            const gz = (j / (gridN - 1) - 0.5) * size;
            const gy =
              Math.sin(gx * 2.3 + timeAcc * 1.8) *
                Math.cos(gz * 2.3 + timeAcc * 1.4) *
                0.38 +
              Math.sin((gx + gz) * 1.5 - timeAcc) * 0.12;
            projectedGrid[i][j] = {
              ...project3D({ x: gx, y: gy, z: gz }, w, h),
              elev: gy
            };
          }
        }

        for (let i = 0; i < gridN - 1; i++) {
          for (let j = 0; j < gridN - 1; j++) {
            const p1 = projectedGrid[i][j];
            const p2 = projectedGrid[i + 1][j];
            const p3 = projectedGrid[i + 1][j + 1];
            const p4 = projectedGrid[i][j + 1];

            const normElev = Math.max(0, Math.min(1, (p1.elev + 0.45) / 0.9));
            const r = Math.round(40 + normElev * 176);
            const g = Math.round(180 + normElev * 75);
            const b = Math.round(110 - normElev * 70);

            ctx.beginPath();
            ctx.moveTo(p1.sx, p1.sy);
            ctx.lineTo(p2.sx, p2.sy);
            ctx.lineTo(p3.sx, p3.sy);
            ctx.lineTo(p4.sx, p4.sy);
            ctx.closePath();
            ctx.fillStyle = `rgba(${r}, ${g}, ${b}, 0.16)`;
            ctx.fill();
            ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, 0.72)`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      } else {
        // Project Torus Mesh
        const projVerts = torusMesh.vertices.map((v) => project3D(v, w, h));

        const sortedFaces = torusMesh.faces
          .map((f) => {
            const p0 = projVerts[f[0]];
            const p1 = projVerts[f[1]];
            const p2 = projVerts[f[2]];
            const p3 = projVerts[f[3]];
            const avgZ = (p0.z + p1.z + p2.z + p3.z) * 0.25;
            return { indices: f, p0, p1, p2, p3, avgZ };
          })
          .sort((a, b) => b.avgZ - a.avgZ);

        sortedFaces.forEach((face) => {
          const { p0, p1, p2, p3 } = face;
          ctx.beginPath();
          ctx.moveTo(p0.sx, p0.sy);
          ctx.lineTo(p1.sx, p1.sy);
          ctx.lineTo(p2.sx, p2.sy);
          ctx.lineTo(p3.sx, p3.sy);
          ctx.closePath();

          if (currentShaderMode === "normals") {
            // Compute screen-space normal approximation for vibrant normal shader look
            const nx = Math.max(0, Math.min(255, Math.round(((p0.x1 + 1.8) / 3.6) * 255)));
            const ny = Math.max(0, Math.min(255, Math.round(((p0.y2 + 1.8) / 3.6) * 255)));
            const nz = Math.max(80, Math.min(255, Math.round(((1.8 - face.avgZ) / 3.6) * 255)));
            ctx.fillStyle = `rgba(${nx}, ${ny}, ${nz}, 0.85)`;
            ctx.fill();
            ctx.strokeStyle = "rgba(7, 9, 14, 0.35)";
            ctx.lineWidth = 0.8;
            ctx.stroke();
          } else {
            // Wireframe mode
            const alpha = Math.max(0.15, Math.min(0.85, (2.2 - face.avgZ) / 3.8));
            ctx.strokeStyle = `rgba(216, 255, 31, ${alpha.toFixed(2)})`;
            ctx.lineWidth = 1.05;
            ctx.stroke();
          }
        });
      }

      requestAnimationFrame(renderEngineFrame);
    }

    requestAnimationFrame(renderEngineFrame);
  }

  /* ========================================================================
     8. INTERACTIVE COMMISSION QUOTE SIMULATOR (#estimator)
     ======================================================================== */
  const pricingConfig = {
    cppApp: {
      title: "C#, C++ 앱 & D3D11 개발",
      dmLabel: "C#, C++ 앱 / D3D11 / 3D엔진 (5~250만원)",
      min: 5,
      max: 250,
      step: 5,
      defaultVal: 85,
      getTierInfo(val) {
        if (val <= 35) {
          return {
            badge: "UTILITY / STARTER SCOPE",
            desc: "경량 C#/C++ 콘솔·데스크톱 유틸리티, 자동화 툴, 알고리즘 모듈 제작에 적합한 실속 구간입니다.",
            deliverables: [
              "요구사항 맞춤형 C# 또는 C++ 핵심 로직 구현",
              "경량 GUI 또는 CLI 인터페이스 구성",
              "실행 빌드 파일 및 깔끔한 주석 포함 소스코드"
            ]
          };
        } else if (val <= 130) {
          return {
            badge: "STANDARD APPLICATION",
            desc: "WPF/WinForms/ImGui 데스크톱 프로그램, DirectX 11 커스텀 뷰어 및 멀티스레드 애플리케이션 구간입니다.",
            deliverables: [
              "모던 데스크톱 UI/UX 또는 D3D11 실시간 렌더링 뷰포트",
              "파일 입출력, 데이터 처리 및 하드웨어 가속 최적화",
              "유지보수가 용이한 모듈형 아키텍처 설계 및 문서화"
            ]
          };
        }
        return {
          badge: "CUSTOM 3D ENGINE / PRO SYSTEM",
          desc: "자체 3D 엔진 아키텍처 구축, 커스텀 HLSL 셰이더 파이프라인, 상용급 고성능 네이티브 소프트웨어 구간입니다.",
          deliverables: [
            "DirectX 11 기반 커스텀 3D 렌더링 파이프라인 & 셰이더 제작",
            "메모리·멀티스레딩 프로파일링 및 극한의 성능 최적화",
            "전체 프로젝트 아키텍처 설계서 및 1:1 기술 인수인계"
          ]
        };
      }
    },
    web: {
      title: "반응형 웹 제작",
      dmLabel: "반응형 웹 제작 (15~150만원)",
      min: 15,
      max: 150,
      step: 5,
      defaultVal: 55,
      getTierInfo(val) {
        if (val <= 40) {
          return {
            badge: "LANDING / PORTFOLIO",
            desc: "개성 있는 개인 포트폴리오, 프로모션 원페이지 랜딩, 깔끔한 반응형 웹 제작에 적합한 구간입니다.",
            deliverables: [
              "모바일 · 태블릿 · 데스크톱 완벽 반응형 레이아웃",
              "세련된 타이포그래피와 스크롤 등장 애니메이션",
              "빠른 로딩 속도 및 검색엔진(SEO) 기본 최적화"
            ]
          };
        } else if (val <= 95) {
          return {
            badge: "BRAND INTERACTIVE WEB",
            desc: "대기업 플래그십 스타일의 고급 인터랙션, 다섹션 구성, 커스텀 UI 컴포넌트가 포함되는 구간입니다.",
            deliverables: [
              "고급 모션 그래픽 및 인터랙티브 UI 컴포넌트 탑재",
              "다크/라이트 테마 시스템 및 맞춤형 견적/문의 기능",
              "크로스 브라우징 검수 및 웹 호스팅 배포 지원"
            ]
          };
        }
        return {
          badge: "FLAGSHIP WEB STUDIO",
          desc: "인터랙티브 3D/Canvas 그래픽 통합, 다페이지 비즈니스 웹사이트 등 하이엔드 맞춤형 패키지 구간입니다.",
          deliverables: [
            "WebGL / 3D 캔버스 인터랙션 및 독창적인 브랜드 연출",
            "전체 서브 페이지 설계 및 커스텀 인터랙티브 모듈 통합",
            "성능 최적화(Lighthouse 고득점) 및 사후 유지보수 가이드"
          ]
        };
      }
    },
    modeling: {
      title: "BLENDER 3D 모델링",
      dmLabel: "BLENDER 3D 모델링 (1~55만원)",
      min: 1,
      max: 55,
      step: 1,
      defaultVal: 18,
      getTierInfo(val) {
        if (val <= 12) {
          return {
            badge: "SINGLE PROP / ASSET",
            desc: "단품 소품, 로우폴리/미드폴리 프롭, 기본 머티리얼 적용 오브젝트 제작에 적합한 구간입니다.",
            deliverables: [
              "깔끔한 토폴로지의 3D 메쉬 모델링 (.blend / .fbx / .obj)",
              "기본 UV 언래핑 및 베이스 컬러/머티리얼 세팅",
              "게임 엔진 또는 렌더링 툴 즉시 임포트 호환 보장"
            ]
          };
        } else if (val <= 32) {
          return {
            badge: "HIGH-DETAIL PBR ASSET",
            desc: "정교한 디테일의 중형 에셋, 4K PBR 텍스처링, 클로스/유기체 표현이 포함되는 표준 구간입니다.",
            deliverables: [
              "하이폴리-로우폴리 노멀 베이킹 및 정밀 UV 최적화",
              "4K PBR 텍스처 맵 (Albedo, Normal, Roughness, Metallic)",
              "언리얼 엔진 5 / Unity / 자체 엔진 머티리얼 프리셋 호환"
            ]
          };
        }
        return {
          badge: "PREMIUM ASSET PACKAGE",
          desc: "복합 하드서피스/유기체 모델, 다수 환경 프롭 패키지, 시네마틱 퀄리티 에셋 제작 구간입니다.",
          deliverables: [
            "시네마틱 등급 고디테일 지오메트리 및 서브서피스/패브릭 셰이딩",
            "다단계 LOD(Level of Detail) 메쉬 및 콜리전 세팅",
            "렌더링 스튜디오 라이팅 샷 및 원본 프로젝트 전체 제공"
          ]
        };
      }
    },
    unreal: {
      title: "언리얼 엔진 5 프로젝트",
      dmLabel: "언리얼 엔진 5 프로젝트 (175~900만원)",
      min: 175,
      max: 900,
      step: 25,
      defaultVal: 350,
      getTierInfo(val) {
        if (val <= 350) {
          return {
            badge: "UE5 ENVIRONMENT & PROTOTYPE",
            desc: "Lumen/Nanite 기반 포토리얼 레벨 디자인, 시네마틱 환경 구축 및 핵심 기능 프로토타입 구간입니다.",
            deliverables: [
              "언리얼 엔진 5 고품질 오픈월드/실내외 환경 & 라이팅 구축",
              "핵심 인터랙션 블루프린트/C++ 프로토타입 구현",
              "고해상도 시네마틱 렌더 시퀀스 및 실행 파일 패키징"
            ]
          };
        } else if (val <= 650) {
          return {
            badge: "CORE GAMEPLAY & SIMULATION",
            desc: "C++ & 블루프린트 하이브리드 아키텍처, AI/물리/UI 시스템이 결합된 본격적인 프로젝트 구간입니다.",
            deliverables: [
              "확장성 높은 C++ 코어 클래스 및 블루프린트 게임플레이 시스템",
              "블렌더 커스텀 3D 에셋 제작 및 엔진 파이프라인 직접 통합",
              "프레임 방어(60~120FPS) 프로파일링 및 리소스 최적화"
            ]
          };
        }
        return {
          badge: "FULL TURNKEY UE5 PRODUCTION",
          desc: "기획 구현부터 커스텀 에셋, C++ 시스템, 최적화, 최종 상용/전시용 빌드 납품까지 총괄하는 플래그십 구간입니다.",
          deliverables: [
            "엔드투엔드(End-to-End) 언리얼 엔진 5 풀 프로덕션 개발",
            "커스텀 셰이더·대규모 월드 빌딩·복합 시뮬레이션/게임 로직 완성",
            "전체 원본 프로젝트, 기술 문서 및 안정화 기술 지원 포함"
          ]
        };
      }
    }
  };

  const catSelectBtns = document.querySelectorAll(".cat-select-btn");
  const budgetRangeInput = document.getElementById("budgetRangeInput");
  const sliderBadgeText = document.getElementById("sliderBadgeText");
  const sliderMinLabel = document.getElementById("sliderMinLabel");
  const sliderMaxLabel = document.getElementById("sliderMaxLabel");
  const estCategoryTitle = document.getElementById("estCategoryTitle");
  const estPriceValue = document.getElementById("estPriceValue");
  const estTierDesc = document.getElementById("estTierDesc");
  const estDeliverablesList = document.getElementById("estDeliverablesList");
  const copyEstimateBriefBtn = document.getElementById("copyEstimateBriefBtn");

  let currentCatKey = "cppApp";

  function updateEstimatorUI() {
    const cfg = pricingConfig[currentCatKey];
    if (!cfg || !budgetRangeInput) return;

    const val = Number(budgetRangeInput.value);
    const tier = cfg.getTierInfo(val);

    if (estCategoryTitle) estCategoryTitle.textContent = cfg.title;
    if (estPriceValue) estPriceValue.textContent = val.toLocaleString("ko-KR");
    if (sliderBadgeText) sliderBadgeText.textContent = tier.badge;
    if (estTierDesc) estTierDesc.textContent = tier.desc;

    if (estDeliverablesList) {
      estDeliverablesList.innerHTML = tier.deliverables
        .map((item) => `<li>${item}</li>`)
        .join("");
    }
  }

  function selectEstimatorCategory(catKey) {
    if (!pricingConfig[catKey]) return;
    currentCatKey = catKey;
    const cfg = pricingConfig[catKey];

    catSelectBtns.forEach((btn) => {
      const isMatch = btn.getAttribute("data-cat") === catKey;
      btn.classList.toggle("active", isMatch);
      btn.setAttribute("aria-checked", String(isMatch));
    });

    if (budgetRangeInput) {
      budgetRangeInput.min = String(cfg.min);
      budgetRangeInput.max = String(cfg.max);
      budgetRangeInput.step = String(cfg.step);
      budgetRangeInput.value = String(cfg.defaultVal);
    }

    if (sliderMinLabel) sliderMinLabel.textContent = `최소 ${cfg.min}만원`;
    if (sliderMaxLabel) sliderMaxLabel.textContent = `최대 ${cfg.max}만원`;

    updateEstimatorUI();
  }

  catSelectBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const cat = btn.getAttribute("data-cat") || "cppApp";
      selectEstimatorCategory(cat);
    });
  });

  if (budgetRangeInput) {
    budgetRangeInput.addEventListener("input", updateEstimatorUI);
  }

  // Pricing Card "견적 시뮬레이션" buttons scroll to & activate category
  const cardSimBtns = document.querySelectorAll("[data-sim-category]");
  cardSimBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const cat = btn.getAttribute("data-sim-category") || "cppApp";
      selectEstimatorCategory(cat);
      const estimatorSec = document.getElementById("estimator");
      if (estimatorSec) {
        estimatorSec.scrollIntoView({ behavior: "smooth" });
      }
    });
  });

  updateEstimatorUI();

  /* ========================================================================
     9. DM BRIEF COMPOSER MODAL & CLIPBOARD COPY
     ======================================================================== */
  const dmModal = document.getElementById("dmModal");
  const closeDmModalBtn = document.getElementById("closeDmModal");
  const dmCategoryInput = document.getElementById("dmCategoryInput");
  const dmBudgetInput = document.getElementById("dmBudgetInput");
  const dmDeadlineInput = document.getElementById("dmDeadlineInput");
  const dmDetailInput = document.getElementById("dmDetailInput");
  const dmPreviewBox = document.getElementById("dmPreviewBox");
  const copyDmFinalBtn = document.getElementById("copyDmFinalBtn");
  const toastNotification = document.getElementById("toastNotification");
  const toastMessage = document.getElementById("toastMessage");

  function showToast(msg) {
    if (!toastNotification || !toastMessage) return;
    toastMessage.textContent = msg;
    toastNotification.classList.add("show");
    setTimeout(() => {
      toastNotification.classList.remove("show");
    }, 3200);
  }

  function buildDmText() {
    const cat = dmCategoryInput ? dmCategoryInput.value : "제작 문의";
    const budget = dmBudgetInput && dmBudgetInput.value.trim() ? dmBudgetInput.value.trim() : "상담 후 결정";
    const deadline = dmDeadlineInput && dmDeadlineInput.value.trim() ? dmDeadlineInput.value.trim() : "일정 협의 가능";
    const detail =
      dmDetailInput && dmDetailInput.value.trim()
        ? dmDetailInput.value.trim()
        : "포트폴리오 사이트를 보고 연락드립니다. 상세 내용 상담 희망합니다!";

    return [
      "안녕하세요! 포트폴리오 웹사이트를 보고 제작 문의드립니다 💬",
      "────────────────────────────────────",
      `• 문의 분야 : ${cat}`,
      `• 희망 예산 : ${budget}`,
      `• 희망 납기 : ${deadline}`,
      `• 상세 내용 : ${detail}`,
      "────────────────────────────────────",
      "확인 후 답변 부탁드립니다. 감사합니다!"
    ].join("\n");
  }

  function refreshDmPreview() {
    if (dmPreviewBox) {
      dmPreviewBox.textContent = buildDmText();
    }
  }

  function openDmModal(prefillCategory, prefillBudget, prefillDetail) {
    if (dmCategoryInput && prefillCategory) {
      for (let i = 0; i < dmCategoryInput.options.length; i++) {
        if (dmCategoryInput.options[i].value.includes(prefillCategory.split(" ")[0])) {
          dmCategoryInput.selectedIndex = i;
          break;
        }
      }
    }
    if (dmBudgetInput && prefillBudget) {
      dmBudgetInput.value = prefillBudget;
    }
    if (dmDetailInput && prefillDetail) {
      dmDetailInput.value = prefillDetail;
    }
    refreshDmPreview();
    if (dmModal) {
      dmModal.classList.add("is-open");
      dmModal.setAttribute("aria-hidden", "false");
    }
  }

  function closeDmModal() {
    if (dmModal) {
      dmModal.classList.remove("is-open");
      dmModal.setAttribute("aria-hidden", "true");
    }
  }

  document.querySelectorAll("[data-open-dm]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const catHint = btn.getAttribute("data-open-dm") || "";
      openDmModal(catHint);
    });
  });

  if (closeDmModalBtn) {
    closeDmModalBtn.addEventListener("click", closeDmModal);
  }

  if (dmModal) {
    dmModal.addEventListener("click", (e) => {
      if (e.target === dmModal) closeDmModal();
    });
  }

  [dmCategoryInput, dmBudgetInput, dmDeadlineInput, dmDetailInput].forEach((input) => {
    if (input) input.addEventListener("input", refreshDmPreview);
  });

  async function copyTextToClipboard(text, successMsg) {
    try {
      await navigator.clipboard.writeText(text);
      showToast(successMsg);
    } catch {
      const temp = document.createElement("textarea");
      temp.value = text;
      document.body.appendChild(temp);
      temp.select();
      document.execCommand("copy");
      document.body.removeChild(temp);
      showToast(successMsg);
    }
  }

  if (copyDmFinalBtn) {
    copyDmFinalBtn.addEventListener("click", () => {
      const text = buildDmText();
      copyTextToClipboard(text, "DM 문의 문구가 클립보드에 복사되었습니다! DM 창에 붙여넣기(Ctrl+V) 하세요 💬");
    });
  }

  if (copyEstimateBriefBtn) {
    copyEstimateBriefBtn.addEventListener("click", () => {
      const cfg = pricingConfig[currentCatKey];
      const val = budgetRangeInput ? budgetRangeInput.value : cfg.defaultVal;
      const checkedAddons = Array.from(
        document.querySelectorAll(".addon-chip input:checked")
      ).map((el) => el.value);

      const addonStr =
        checkedAddons.length > 0 ? `희망 옵션: ${checkedAddons.join(", ")}` : "기본 구성 희망";

      openDmModal(cfg.dmLabel, `약 ${val}만원 내외`, `${cfg.title} 시뮬레이터 견적 문의 (${addonStr})`);
      const text = buildDmText();
      copyTextToClipboard(text, `예상 견적(${val}만원) DM 양식이 복사되었습니다! 💬`);
    });
  }

  refreshDmPreview();

  /* ========================================================================
     10. FULLSCREEN RENDER LIGHTBOX INSPECTOR
     ======================================================================== */
  const lightboxModal = document.getElementById("lightboxModal");
  const lightboxImg = document.getElementById("lightboxImg");
  const lightboxTitle = document.getElementById("lightboxTitle");
  const lightboxDesc = document.getElementById("lightboxDesc");
  const closeLightboxBtn = document.getElementById("closeLightboxBtn");

  function openLightbox(src, title, desc) {
    if (!lightboxModal || !lightboxImg) return;
    lightboxImg.src = src;
    if (lightboxTitle) lightboxTitle.textContent = title || "RENDERING INSPECTOR";
    if (lightboxDesc) lightboxDesc.textContent = desc || "";
    lightboxModal.classList.add("is-open");
    lightboxModal.setAttribute("aria-hidden", "false");
  }

  function closeLightbox() {
    if (!lightboxModal) return;
    lightboxModal.classList.remove("is-open");
    lightboxModal.setAttribute("aria-hidden", "true");
  }

  if (openHeroLightboxBtn) {
    openHeroLightboxBtn.addEventListener("click", () => {
      const s = sceneData[activeSceneIndex] || sceneData[0];
      openLightbox(s.src, s.lightboxTitle, s.lightboxDesc);
    });
  }

  document.querySelectorAll("[data-lightbox-src]").forEach((mediaEl) => {
    mediaEl.addEventListener("click", () => {
      const src = mediaEl.getAttribute("data-lightbox-src") || "";
      const title = mediaEl.getAttribute("data-lightbox-title") || "";
      const desc = mediaEl.getAttribute("data-lightbox-desc") || "";
      openLightbox(src, title, desc);
    });
  });

  if (closeLightboxBtn) {
    closeLightboxBtn.addEventListener("click", closeLightbox);
  }

  if (lightboxModal) {
    lightboxModal.addEventListener("click", (e) => {
      if (e.target === lightboxModal) closeLightbox();
    });
  }

  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeDmModal();
      closeLightbox();
    }
  });
});
