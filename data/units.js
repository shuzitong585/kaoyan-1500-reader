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
    U17: "data/u17.js?v=1",
    U18: "data/u18.js?v=1",
    U19: "data/u19.js?v=1",
    U20: "data/u20.js?v=1",
    U21: "data/u21.js?v=1",
    U22: "data/u22.js?v=1",
    U23: "data/u23.js?v=1",
    U24: "data/u24.js?v=1",
    U25: "data/u25.js?v=1",
    U26: "data/u26.js?v=1",
    U27: "data/u27.js?v=1",
    U28: "data/u28.js?v=1",
    U29: "data/u29.js?v=1",
    U30: "data/u30.js?v=1",
    U31: "data/u31.js?v=1",
    U32: "data/u32.js?v=1",
    U33: "data/u33.js?v=1",
    U34: "data/u34.js?v=1",
    U35: "data/u35.js?v=1",
    U36: "data/u36.js?v=1",
    U37: "data/u37.js?v=1",
    U38: "data/u38.js?v=1",
    U39: "data/u39.js?v=1",
    U40: "data/u40.js?v=1",
    U41: "data/u41.js?v=1",
    U42: "data/u42.js?v=1",
    U43: "data/u43.js?v=1",
    U44: "data/u44.js?v=1",
    U45: "data/u45.js?v=1",
    U46: "data/u46.js?v=1",
    U47: "data/u47.js?v=1",
    U48: "data/u48.js?v=1",
    U49: "data/u49.js?v=1",
    U50: "data/u50.js?v=1",
    U51: "data/u51.js?v=1",
    U52: "data/u52.js?v=1",
    U53: "data/u53.js?v=1",
    U54: "data/u54.js?v=1",
    U55: "data/u55.js?v=1",
    U56: "data/u56.js?v=1",
    U57: "data/u57.js?v=1",
    U58: "data/u58.js?v=1",
    U59: "data/u59.js?v=1"
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
