"use client";

import { useEffect, useState } from "react";
import {
  Activity,
  AlertTriangle,
  Boxes,
  BrainCircuit,
  Cpu,
  Gauge,
  Info,
  Pause,
  Play,
  Radio,
  Server,
  Workflow,
  Zap,
} from "lucide-react";
import {
  ALARM_SEVERITY_COPY,
  FACTORY_ALARMS,
  FACTORY_DISCLAIMER,
  FACTORY_KPIS,
  FACTORY_LAYERS,
  FACTORY_PIPELINE,
  FACTORY_STATIONS,
  STATION_STATUS_COPY,
  type FactoryAlarmSeverity,
  type FactoryKpi,
  type FactoryPipelineIcon,
  type FactorySceneKey,
} from "@/lib/smart-factory";

const KPI_ICONS = { oee: Gauge, output: Boxes, stops: AlertTriangle, energy: Zap, scrap: Activity } as const;
const PIPE_ICONS: Record<FactoryPipelineIcon, typeof Radio> = {
  radio: Radio,
  cpu: Cpu,
  server: Server,
  workflow: Workflow,
  boxes: Boxes,
  brain: BrainCircuit,
};

const TONE = {
  ok: "#34d399",
  warn: "#fbbf24",
  idle: "#94a3b8",
  accent: "#22d3ee",
  critical: "#fb7185",
  warning: "#fbbf24",
  info: "#38bdf8",
} as const;

/** عنوان کوتاه ایستگاه‌ها در نقشه؛ مقدار شاخص از خود دادهٔ ایستگاه خوانده می‌شود. */
const SCENE_LABELS: Record<string, string> = {
  injection: "تزریق ۱",
  assembly: "مونتاژ",
  packaging: "بسته‌بندی",
  warehouse: "انبار",
};

const numberFormat = (kpi: FactoryKpi, value: number) =>
  new Intl.NumberFormat("fa-IR", {
    minimumFractionDigits: kpi.decimals,
    maximumFractionDigits: kpi.decimals,
  }).format(value);

/** سری اولیهٔ قطعی تا خروجی سرور و مرورگر یکسان بماند. */
function seedSeries(kpi: FactoryKpi, index: number): number[] {
  return Array.from({ length: 24 }, (_, i) => {
    const value = kpi.base + Math.sin((i + index * 4) / 3.2) * kpi.jitter;
    return kpi.decimals === 0 ? Math.round(value) : value;
  });
}

function Spark({ data, tone }: { data: number[]; tone: string }) {
  const min = Math.min(...data);
  const max = Math.max(...data);
  const span = max - min || 1;
  const points = data
    .map((value, index) => `${(index / (data.length - 1)) * 100},${26 - ((value - min) / span) * 22}`)
    .join(" ");
  return (
    <svg viewBox="0 0 100 28" preserveAspectRatio="none" className="h-7 w-full" aria-hidden="true">
      <polyline points={points} fill="none" stroke={tone} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function SceneGlyph({ kind }: { kind: "plc" | "edge" | "erp" | "brain" }) {
  const stroke = TONE.accent;
  if (kind === "plc") {
    return (
      <g opacity="0.75">
        <rect x="0" y="2" width="20" height="18" rx="3" fill="none" stroke={stroke} strokeWidth="1.4" />
        <line x1="5" y1="7" x2="5" y2="15" stroke={stroke} strokeWidth="1.4" strokeLinecap="round" />
        <line x1="10" y1="7" x2="10" y2="15" stroke={stroke} strokeWidth="1.4" strokeLinecap="round" />
        <line x1="15" y1="7" x2="15" y2="15" stroke={stroke} strokeWidth="1.4" strokeLinecap="round" />
      </g>
    );
  }
  if (kind === "edge") {
    return (
      <g opacity="0.75">
        <rect x="3" y="5" width="14" height="14" rx="3" fill="none" stroke={stroke} strokeWidth="1.4" />
        {[0, 1, 2].map((i) => (
          <line key={`t${i}`} x1={6 + i * 4} y1="1.5" x2={6 + i * 4} y2="5" stroke={stroke} strokeWidth="1.2" />
        ))}
        {[0, 1, 2].map((i) => (
          <line key={`b${i}`} x1={6 + i * 4} y1="19" x2={6 + i * 4} y2="22.5" stroke={stroke} strokeWidth="1.2" />
        ))}
      </g>
    );
  }
  if (kind === "erp") {
    return (
      <g opacity="0.75">
        <rect x="1" y="10" width="18" height="8" rx="2" fill="none" stroke={stroke} strokeWidth="1.4" />
        <rect x="4" y="3" width="12" height="7" rx="2" fill="none" stroke={stroke} strokeWidth="1.4" />
        <line x1="10" y1="17" x2="10" y2="21" stroke={stroke} strokeWidth="1.4" />
      </g>
    );
  }
  return (
    <g opacity="0.8">
      <circle cx="10" cy="5" r="3" fill="none" stroke={stroke} strokeWidth="1.4" />
      <circle cx="4" cy="17" r="2.6" fill="none" stroke={stroke} strokeWidth="1.4" />
      <circle cx="16" cy="17" r="2.6" fill="none" stroke={stroke} strokeWidth="1.4" />
      <line x1="8" y1="8" x2="5" y2="14" stroke={stroke} strokeWidth="1.2" />
      <line x1="12" y1="8" x2="15" y2="14" stroke={stroke} strokeWidth="1.2" />
    </g>
  );
}

const LAYER_BOXES: {
  key: Exclude<FactorySceneKey, "field">;
  x: number;
  width: number;
  title: string;
  latin: string;
  tag: string;
  glyph: "plc" | "edge" | "erp" | "brain";
}[] = [
  { key: "brain", x: 20, width: 148, title: "هوش و داشبورد", latin: "ANALYTICS", tag: "پیش‌بینی و تصمیم", glyph: "brain" },
  { key: "erp", x: 192, width: 128, title: "مالی و انبار", latin: "ERP · WMS", tag: "موجودی و بهای تمام‌شده", glyph: "erp" },
  { key: "edge", x: 344, width: 128, title: "لبه و اجرای تولید", latin: "EDGE · MES", tag: "سفارش، OEE، کیفیت", glyph: "edge" },
  { key: "control", x: 496, width: 124, title: "کنترل و پایش", latin: "PLC · SCADA", tag: "بلادرنگ", glyph: "plc" },
];

const MACHINES = [
  { id: "injection", x: 356, width: 122 },
  { id: "assembly", x: 216, width: 122 },
  { id: "packaging", x: 76, width: 122 },
];

const MACHINE_TOP = 158;
const MACHINE_HEIGHT = 84;
const BUS_Y = 130;

function MachineCard({
  x,
  width,
  title,
  latin,
  tone,
  value,
  status,
  selected,
  active,
  onSelect,
}: {
  x: number;
  width: number;
  title: string;
  latin: string;
  tone: string;
  value: string;
  status: string;
  selected: boolean;
  active: boolean;
  onSelect: () => void;
}) {
  return (
    <g className={`cursor-pointer ${active ? "sf-on" : "sf-dim"}`} onClick={onSelect} role="presentation">
      <rect
        x={x}
        y={MACHINE_TOP}
        width={width}
        height={MACHINE_HEIGHT}
        rx="10"
        fill="url(#sf-box)"
        stroke={selected || active ? "#2f7f93" : "#22384a"}
        strokeWidth={selected ? 1.8 : 1}
      />
      <circle cx={x + width - 13} cy={MACHINE_TOP + 14} r="3.2" fill={tone} />
      <circle
        cx={x + width - 13}
        cy={MACHINE_TOP + 14}
        r="3.2"
        fill="none"
        stroke={tone}
        strokeWidth="1.2"
        className="sf-ping"
      />
      <text x={x + width / 2} y={MACHINE_TOP + 30} textAnchor="middle" fontSize="11" fill="#e6f6fb" fontWeight="700">
        {title}
      </text>
      <text x={x + width / 2} y={MACHINE_TOP + 43} textAnchor="middle" fontSize="7" fill="#7b9db2" letterSpacing="0.6">
        {latin}
      </text>
      <line x1={x + 14} y1={MACHINE_TOP + 52} x2={x + width - 14} y2={MACHINE_TOP + 52} stroke="#1b2f3f" />
      <text x={x + width / 2} y={MACHINE_TOP + 70} textAnchor="middle" fontSize="13" fill={TONE.accent} fontWeight="700">
        {value}
      </text>
      <text x={x + width / 2} y={MACHINE_TOP + 80} textAnchor="middle" fontSize="7" fill="#6d8fa3">
        {status}
      </text>
    </g>
  );
}

function FactoryScene({
  layerIndex,
  stationId,
  onStation,
}: {
  layerIndex: number;
  stationId: string | null;
  onStation: (id: string) => void;
}) {
  const activeKeys = new Set(FACTORY_LAYERS[layerIndex]?.scene ?? []);
  const groupClass = (key: FactorySceneKey, extra = "") =>
    `${extra} ${activeKeys.has(key) ? "sf-on" : "sf-dim"}`.trim();
  const warehouse = FACTORY_STATIONS.find((item) => item.id === "warehouse");

  return (
    <svg
      viewBox="0 0 640 318"
      className="h-auto w-full"
      role="img"
      aria-label="نقشهٔ اتوماسیون هوشمند کارخانه: ماشین‌ها و نوار نقاله در کف کارگاه، اتوبوس دادهٔ میدانی، PLC و SCADA، لبه و MES، مالی و انبار، و داشبورد هوش برای تصمیم مدیر."
    >
      <defs>
        <pattern id="sf-grid" width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M20 0H0V20" fill="none" stroke="#0e1c29" strokeWidth="1" />
        </pattern>
        <linearGradient id="sf-box" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0f1b28" />
          <stop offset="100%" stopColor="#0a1420" />
        </linearGradient>
      </defs>

      <rect width="640" height="318" fill="#060a12" />
      <rect width="640" height="318" fill="url(#sf-grid)" />

      {/* مسیر دادهٔ میان لایه‌ها: از میدان به سمت تصمیم (راست به چپ) */}
      {[
        [496, 470],
        [344, 318],
        [192, 166],
      ].map(([from, to]) => (
        <g key={`link-${from}`} className="sf-on">
          <line x1={from} y1="56" x2={to + 9} y2="56" stroke="#3b9aae" strokeWidth="1.6" className="sf-flow" />
          <path
            d={`M${to + 9} 51 L${to + 1} 56 L${to + 9} 61 Z`}
            fill="#3b9aae"
          />
        </g>
      ))}

      {/* جعبه‌های لایه */}
      {LAYER_BOXES.map((box) => {
        const isActive = activeKeys.has(box.key);
        return (
          <g key={box.key} className={groupClass(box.key)}>
            <rect
              x={box.x}
              y="14"
              width={box.width}
              height="84"
              rx="11"
              fill="url(#sf-box)"
              stroke={isActive ? TONE.accent : "#1d3446"}
              strokeWidth={isActive ? 1.4 : 1}
            />
            <g transform={`translate(${box.x + 13}, 25)`}>
              <SceneGlyph kind={box.glyph} />
            </g>
            <text
              x={box.x + box.width - 13}
              y="40"
              textAnchor="end"
              fontSize="7.2"
              fill="#7b9db2"
              letterSpacing="0.7"
              direction="ltr"
            >
              {box.latin}
            </text>
            <text x={box.x + box.width - 13} y="61" textAnchor="end" fontSize="11.5" fill="#e6f6fb" fontWeight="700">
              {box.title}
            </text>
            <text x={box.x + box.width - 13} y="76" textAnchor="end" fontSize="7.4" fill="#6d8fa3">
              {box.tag}
            </text>
          </g>
        );
      })}

      {/* اتوبوس دادهٔ میدانی */}
      <g className={groupClass("control")}>
        <line x1="558" y1="98" x2="558" y2={BUS_Y} stroke="#24485a" strokeWidth="1.4" strokeDasharray="5 6" />
        <line x1="137" y1={BUS_Y} x2="558" y2={BUS_Y} stroke="#24485a" strokeWidth="1.4" strokeDasharray="5 6" />
        {[137, 277, 417, 558].map((x) => (
          <line key={`riser-${x}`} x1={x} y1={BUS_Y} x2={x} y2={MACHINE_TOP} stroke="#24485a" strokeWidth="1.4" />
        ))}
        {[137, 277, 417].map((x, index) => (
          <circle key={`packet-${x}`} r="2.4" fill={TONE.accent} className="sf-packet">
            <animateMotion dur="4.5s" repeatCount="indefinite" path={`M${x},${BUS_Y} L558,${BUS_Y}`} begin={`${index * 0.8}s`} />
          </circle>
        ))}
        <text x="150" y={BUS_Y - 7} fontSize="7.4" fill="#6c8ea3">
          اتوبوس دادهٔ میدانی
        </text>
        <text x="150" y={BUS_Y - 7} dx="0" fontSize="6.6" fill="#5b7d92" direction="ltr" textAnchor="start">
          <tspan x="238">Modbus / IO-Link</tspan>
        </text>
      </g>

      {/* ماشین‌ها */}
      {MACHINES.map((machine) => {
        const station = FACTORY_STATIONS.find((item) => item.id === machine.id);
        if (!station) return null;
        return (
          <MachineCard
            key={machine.id}
            x={machine.x}
            width={machine.width}
            title={SCENE_LABELS[machine.id] ?? station.name}
            latin={station.latin}
            tone={TONE[STATION_STATUS_COPY[station.status].tone]}
            value={station.metric.value}
            status={STATION_STATUS_COPY[station.status].label}
            selected={stationId === machine.id}
            active={activeKeys.has("field")}
            onSelect={() => onStation(machine.id)}
          />
        );
      })}

      {warehouse ? (
        <MachineCard
          x={496}
          width={124}
          title={SCENE_LABELS.warehouse ?? warehouse.name}
          latin={warehouse.latin}
          tone={TONE[STATION_STATUS_COPY[warehouse.status].tone]}
          value={warehouse.metric.value}
          status={STATION_STATUS_COPY[warehouse.status].label}
          selected={stationId === warehouse.id}
          active={activeKeys.has("erp")}
          onSelect={() => onStation(warehouse.id)}
        />
      ) : null}

      {/* نوار نقاله */}
      <g className={groupClass("field")}>
        <rect x="76" y="254" width="444" height="10" rx="5" fill="#080f18" stroke="#1d3446" />
        <line
          x1="84"
          y1="259"
          x2="512"
          y2="259"
          stroke="#2f7f93"
          strokeWidth="2.2"
          strokeDasharray="9 11"
          strokeLinecap="round"
          className="sf-belt"
        />
        <path d="M76 264v10h444v-10" fill="none" stroke="#152636" strokeWidth="1.2" />
        {[150, 232, 314, 396, 478].map((x) => (
          <rect key={`part-${x}`} x={x} y="251" width="13" height="7" rx="1.6" fill="#0d2531" stroke="#3b8ea3" strokeWidth="0.9" />
        ))}
      </g>

      {/* مسیر خودروی خودگردان */}
      <line
        x1="80"
        y1="292"
        x2="512"
        y2="292"
        stroke="#152636"
        strokeWidth="1.2"
        strokeDasharray="12 10"
      />
      <g className="sf-agv">
        <rect x="0" y="285" width="30" height="13" rx="4" fill="#102734" stroke="#2f7f93" />
        <rect x="4" y="288" width="9" height="5" rx="1.5" fill="#22d3ee" opacity="0.7" />
        <circle cx="8" cy="300" r="2.4" fill="#0a1420" stroke="#2f7f93" strokeWidth="1.2" />
        <circle cx="23" cy="300" r="2.4" fill="#0a1420" stroke="#2f7f93" strokeWidth="1.2" />
      </g>

      <text x="524" y="298" fontSize="7.4" fill="#6c8ea3">
        سالن تولید، شبیه‌سازی
      </text>
      <text x="524" y="310" fontSize="7" fill="#5b7d92">
        AGV / مسیر خودگردان
      </text>
    </svg>
  );
}

export function SmartFactorySection() {
  const [layerIndex, setLayerIndex] = useState(2);
  const [stationId, setStationId] = useState<string | null>(null);
  const [live, setLive] = useState(true);
  const [series, setSeries] = useState<number[][]>(() => FACTORY_KPIS.map((kpi, index) => seedSeries(kpi, index)));

  useEffect(() => {
    if (!live) return;
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const timer = window.setInterval(() => {
      setSeries((previous) =>
        previous.map((values, index) => {
          const kpi = FACTORY_KPIS[index];
          const last = values[values.length - 1] ?? kpi.base;
          const drift = (kpi.base - last) * 0.3;
          const noise = (Math.random() - 0.5) * 2 * kpi.jitter;
          let next = last + drift + noise;
          if (kpi.decimals === 0) next = Math.round(next);
          const min = kpi.base - kpi.jitter * 3;
          const max = kpi.base + kpi.jitter * 3;
          next = Math.min(max, Math.max(min, next));
          return [...values.slice(-23), next];
        }),
      );
    }, 2400);

    return () => window.clearInterval(timer);
  }, [live]);

  const activeLayer = FACTORY_LAYERS[layerIndex];

  return (
    <div>
      {/* نوار وضعیت */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-2 rounded-full border border-[#1e3446] bg-[#0b1622] px-3 py-1.5 text-[11px] text-[#9fd8e4]">
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full rounded-full bg-[#34d399] opacity-70 sf-live-ping" />
              <span className="relative inline-flex size-2 rounded-full bg-[#34d399]" />
            </span>
            {live ? "شبیه‌سازی زنده" : "شبیه‌سازی متوقف"}
          </span>
          <span className="rounded-full border border-[#1e3446] px-3 py-1.5 text-[11px] text-[#7fa3b8]">۲۳۸ تگ فعال</span>
          <span className="rounded-full border border-[#1e3446] px-3 py-1.5 text-[11px] text-[#7fa3b8]">OPC UA · MQTT</span>
        </div>
        <button
          type="button"
          onClick={() => setLive((value) => !value)}
          aria-pressed={!live}
          className="inline-flex items-center gap-2 rounded-full border border-[#28485c] bg-[#0b1622] px-3.5 py-1.5 text-[11px] font-bold text-[#bfe9f3] transition-colors hover:border-[#22d3ee] hover:text-white"
        >
          {live ? <Pause className="size-3.5" aria-hidden /> : <Play className="size-3.5" aria-hidden />}
          {live ? "توقف شبیه‌سازی" : "ادامهٔ شبیه‌سازی"}
        </button>
      </div>

      {/* شاخص‌ها */}
      <dl className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
        {FACTORY_KPIS.map((kpi, index) => {
          const values = series[index];
          const value = values[values.length - 1] ?? kpi.base;
          const better = kpi.good === "up" ? value >= kpi.base : value <= kpi.base;
          const tone = better ? TONE.ok : TONE.warn;
          const Icon = KPI_ICONS[kpi.id as keyof typeof KPI_ICONS] ?? Gauge;
          return (
            <div key={kpi.id} className="rounded-xl border border-[#182b3a] bg-[#0a131e] p-4">
              <dt className="flex items-center gap-2 text-[11px] text-[#7fa3b8]">
                <Icon className="size-3.5" aria-hidden style={{ color: tone }} />
                {kpi.label}
              </dt>
              <dd className="mt-2">
                <span className="font-mono text-xl font-bold text-white" dir="ltr">
                  {numberFormat(kpi, value)}
                </span>
                <span className="ms-1 text-[10px] text-[#7fa3b8]">{kpi.unit}</span>
                <Spark data={values} tone={tone} />
                <span className="mt-1 block text-[10px] text-[#5f8398]">{kpi.target}</span>
              </dd>
            </div>
          );
        })}
      </dl>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1.55fr_1fr]">
        {/* صحنه */}
        <div className="rounded-2xl border border-[#182b3a] bg-[#080f18] p-3 sm:p-5">
          <div className="-mx-1 overflow-x-auto pb-1">
            <div className="min-w-[540px] px-1">
              <FactoryScene layerIndex={layerIndex} stationId={stationId} onStation={setStationId} />
            </div>
          </div>
          <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
            {FACTORY_STATIONS.map((station) => {
              const status = STATION_STATUS_COPY[station.status];
              const selected = stationId === station.id;
              return (
                <button
                  key={station.id}
                  type="button"
                  onClick={() => setStationId(selected ? null : station.id)}
                  aria-pressed={selected}
                  className={`rounded-lg border p-2.5 text-start transition-colors ${
                    selected ? "border-[#22d3ee] bg-[#0d2431]" : "border-[#182b3a] bg-[#0a131e] hover:border-[#2a4a5c]"
                  }`}
                >
                  <span className="flex items-center gap-1.5 text-[11px] font-bold text-[#dbeef5]">
                    <span className="size-1.5 shrink-0 rounded-full" style={{ background: TONE[status.tone] }} />
                    {station.name}
                  </span>
                  <span className="mt-1 block text-[10px] text-[#7fa3b8]">
                    {station.metric.label}: <span className="font-mono text-[#9fd8e4]">{station.metric.value}</span>
                  </span>
                </button>
              );
            })}
          </div>
          {stationId ? (
            <p className="mt-3 flex items-start gap-2 rounded-lg border border-[#182b3a] bg-[#0a131e] p-3 text-[11px] leading-6 text-[#9db8c8]">
              <Info className="mt-1 size-3.5 shrink-0 text-[#22d3ee]" aria-hidden />
              <span>
                <strong className="text-[#dbeef5]">{FACTORY_STATIONS.find((item) => item.id === stationId)?.name}:</strong>{" "}
                {FACTORY_STATIONS.find((item) => item.id === stationId)?.note}
              </span>
            </p>
          ) : (
            <p className="mt-3 text-[11px] leading-6 text-[#5f8398]">
              روی هر ماشین در نقشه یا کارت زیر آن بزنید تا وضعیت لحظه‌ای همان ایستگاه را ببینید.
            </p>
          )}
        </div>

        {/* لایه‌ها */}
        <div className="rounded-2xl border border-[#182b3a] bg-[#0a131e] p-3 sm:p-4">
          <h3 className="px-1 text-xs font-bold text-[#dbeef5]">لایه‌های اتوماسیون</h3>
          <div className="mt-3 space-y-1.5">
            {FACTORY_LAYERS.map((layer, index) => {
              const selected = index === layerIndex;
              return (
                <button
                  key={layer.id}
                  type="button"
                  onClick={() => setLayerIndex(index)}
                  aria-pressed={selected}
                  className={`flex w-full items-center gap-3 rounded-lg border px-3 py-2.5 text-start transition-colors ${
                    selected ? "border-[#22d3ee] bg-[#0d2431]" : "border-transparent hover:border-[#22384a] hover:bg-[#0d1824]"
                  }`}
                >
                  <span
                    className={`rounded-md px-1.5 py-0.5 font-mono text-[9px] ${
                      selected ? "bg-[#22d3ee] text-[#04121a]" : "bg-[#132434] text-[#7fa3b8]"
                    }`}
                  >
                    {layer.level}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-[12.5px] font-bold text-[#e6f6fb]">{layer.title}</span>
                    <span className="block font-mono text-[9px] text-[#5f8398]" dir="ltr">
                      {layer.latin}
                    </span>
                  </span>
                </button>
              );
            })}
          </div>

          <div className="mt-4 rounded-xl border border-[#182b3a] bg-[#080f18] p-4">
            <p className="text-[11.5px] leading-6 text-[#a9c4d2]">{activeLayer.summary}</p>
            <h4 className="mt-4 text-[10px] font-bold text-[#5f8398]">داده‌های این لایه</h4>
            <ul className="mt-2 space-y-1">
              {activeLayer.data.map((item) => (
                <li key={item} className="flex items-start gap-2 text-[11px] leading-5 text-[#c5dbe6]">
                  <span className="mt-1.5 size-1 shrink-0 rounded-full bg-[#22d3ee]" />
                  {item}
                </li>
              ))}
            </ul>
            <h4 className="mt-4 text-[10px] font-bold text-[#5f8398]">فناوری</h4>
            <ul className="mt-2 flex flex-wrap gap-1.5">
              {activeLayer.tech.map((item) => (
                <li key={item} className="rounded-md border border-[#22384a] px-2 py-0.5 font-mono text-[9px] text-[#9fd8e4]" dir="ltr">
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-4 rounded-lg border-s-2 border-[#34d399] bg-[#0b1a20] px-3 py-2 text-[11px] leading-6 text-[#bfe9dd]">
              {activeLayer.outcome}
            </p>
          </div>
        </div>
      </div>

      {/* مسیر داده */}
      <div className="mt-6 rounded-2xl border border-[#182b3a] bg-[#0a131e] p-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h3 className="text-xs font-bold text-[#dbeef5]">مسیر داده؛ از سنسور تا تصمیم مدیر</h3>
          <span className="text-[10px] text-[#5f8398]">روی هر مرحله بزنید تا لایهٔ متناظر روشن شود</span>
        </div>
        <ol className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-6">
          {FACTORY_PIPELINE.map((step, index) => {
            const Icon = PIPE_ICONS[step.icon];
            const selected = step.layer === layerIndex;
            return (
              <li key={step.id} className="relative">
                <button
                  type="button"
                  onClick={() => setLayerIndex(step.layer)}
                  className={`w-full rounded-xl border p-3 text-start transition-colors ${
                    selected ? "border-[#22d3ee] bg-[#0d2431]" : "border-[#182b3a] bg-[#080f18] hover:border-[#2a4a5c]"
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <Icon className="size-4 text-[#22d3ee]" aria-hidden />
                    <span className="font-mono text-[9px] text-[#5f8398]" dir="ltr">
                      0{index + 1}
                    </span>
                  </span>
                  <span className="mt-2 block text-[11.5px] font-bold text-[#dbeef5]">{step.title}</span>
                  <span className="mt-0.5 block text-[10px] text-[#7fa3b8]">{step.subtitle}</span>
                </button>
              </li>
            );
          })}
        </ol>
      </div>

      {/* هشدارها */}
      <div className="mt-6 rounded-2xl border border-[#182b3a] bg-[#0a131e] p-4">
        <div className="flex items-center justify-between gap-2">
          <h3 className="text-xs font-bold text-[#dbeef5]">جریان هشدارها</h3>
          <span className="font-mono text-[10px] text-[#5f8398]" dir="ltr">
            {FACTORY_ALARMS.length} EVENTS
          </span>
        </div>
        <ul className="mt-3 grid gap-2 md:grid-cols-2">
          {FACTORY_ALARMS.map((alarm) => (
            <li key={alarm.id} className="flex items-start gap-2.5 rounded-lg border border-[#182b3a] bg-[#080f18] p-3">
              <span
                className="mt-1.5 size-2 shrink-0 rounded-full"
                style={{ background: TONE[alarm.severity as FactoryAlarmSeverity] }}
              />
              <span className="min-w-0">
                <span className="flex flex-wrap items-center gap-2">
                  <span
                    className="rounded px-1.5 py-0.5 text-[9px] font-bold"
                    style={{ color: TONE[alarm.severity as FactoryAlarmSeverity], background: "#0e1c26" }}
                  >
                    {ALARM_SEVERITY_COPY[alarm.severity]}
                  </span>
                  <span className="text-[9.5px] text-[#5f8398]">{alarm.time}</span>
                </span>
                <span className="mt-1 block text-[11px] leading-5 text-[#b9d1dd]">{alarm.text}</span>
              </span>
            </li>
          ))}
        </ul>
      </div>

      <p className="mt-4 flex items-start gap-2 text-[10.5px] leading-6 text-[#5f8398]">
        <Info className="mt-1 size-3.5 shrink-0" aria-hidden />
        {FACTORY_DISCLAIMER}
      </p>
    </div>
  );
}
