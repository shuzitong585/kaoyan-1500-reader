(function () {
  const manifests = Object.freeze({
    U01: "data/u01.js?v=3",
    U02: "data/u02.js?v=5",
    U03: "data/u03.js?v=2",
    U04: "data/u04.js?v=2",
    U05: "data/u05.js?v=2",
    U06: "data/u06.js?v=1",
    U07: "data/u07.js?v=1",
    U08: "data/u08.js?v=1",
    U09: "data/u09.js?v=1",
    U10: "data/u10.js?v=1",
    U11: "data/u11.js?v=1",
    U12: "data/u12.js?v=1",
    U13: "data/u13.js?v=1",
    U14: "data/u14.js?v=1",
    U15: "data/u15.js?v=1",
    U16: "data/u16.js?v=1",
    U17: "data/u17.js?v=1"
  });
  const manifestSource = "data/unit-manifest.js?v=4";
  const defaultUnitId = "U01";
  const units = new Map();
  let manifestPromise;

  function normalizeId(value) {
    return String(value || "").trim().toUpperCase();
  }

  function loadScript(source) {
    return new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = source;
      script.onload = resolve;
      script.onerror = () => reject(new Error(`无法加载 ${source}。`));
      document.head.append(script);
    });
  }

  async function ensureManifest() {
    if (!manifestPromise) manifestPromise = loadScript(manifestSource);
    await manifestPromise;
    if (!window.UnitManifest) throw new Error(`${manifestSource} 已加载，但没有建立 UnitManifest。`);
  }

  window.UnitRegistry = {
    listRoutes() {
      return Object.keys(manifests);
    },
    register(unit) {
      if (!unit || typeof unit !== "object") throw new Error("Unit 数据必须是对象。");
      const id = normalizeId(unit.id);
      if (!id) throw new Error("Unit 数据缺少 id。");
      if (units.has(id)) throw new Error(`Unit ${id} 被重复注册。`);
      units.set(id, unit);
    },
    async load(requestedId) {
      const id = normalizeId(requestedId || defaultUnitId);
      const source = manifests[id];
      if (!source) throw new Error(`未找到 Unit：${id}。请先在 data/units.js 中注册该 Unit。`);
      await ensureManifest();
      if (!units.has(id)) {
        await loadScript(source);
      }
      const unit = units.get(id);
      if (!unit) throw new Error(`${source} 已加载，但没有注册 ${id}。`);
      window.UnitManifest.validateOfficialUnit(unit);
      return unit;
    }
  };
})();
