const OpMerk = [
  { id: 1, name: "Toyota" },
  { id: 2, name: "Daihatsu" },
  { id: 3, name: "Honda" },
  { id: 4, name: "Yamaha" },
];

const OpYear = [
  { id: 1, name: "2023" },
  { id: 2, name: "2022" },
  { id: 3, name: "2021" },
  { id: 4, name: "2020" },
  { id: 5, name: "2019" },
  { id: 6, name: "2018" },
  { id: 7, name: "2017" },
  { id: 8, name: "2016" },
  { id: 9, name: "2015" },
  { id: 10, name: "2014" },
  { id: 11, name: "2013" },
  { id: 12, name: "2012" },
  { id: 13, name: "2011" },
  { id: 14, name: "2010" },
];

const OpTypeKendaraan = [
  { id: 0, name: "None" },
  { id: 1, name: "Sigra D 1.0 MT" },
  { id: 2, name: "Cayla D.1.2 MT" },
  { id: 3, name: "Sigra" },
  { id: 4, name: "Avanza" },
  { id: 5, name: "GRAND-Max" },
  { id: 6, name: "GRAND-Max Box 1.5" },
  { id: 7, name: "GRAND-Max BLINDVAN MT AC AB" },
  { id: 8, name: "GRAND-Max BLINDVAN 1.3 AC" },
  { id: 9, name: "Daihatsu S 402 RP" },
  { id: 10, name: "L300 BOX" },
  { id: 11, name: "PICKUP BOX" },
  { id: 12, name: "S401RP-PMREJJ-HA PICKUP BOX" },
  { id: 13, name: "Box" },
  { id: 14, name: "Beat" },
  { id: 15, name: "Gear" },
  { id: 16, name: "Nmax" },
  { id: 17, name: "Gear" },
  { id: 18, name: "Nmax C/ABS" },
  { id: 19, name: "Gear 125" },
  { id: 20, name: "Beat Sporty 110" },
  { id: 21, name: "Nmax 155 C/ABS" },
];

const OpStnk = [
  { value: 0, label: "None" },
  { value: 1, label: "ADA" },
  { value: 2, label: "TIDAK ADA" },
];

const opCondition = [
  { value: 0, label: "None" },
  { value: 1, label: "AKTIF" },
  { value: 2, label: "TIDAK AKTIF" },
];

const OpMerkSpecialTools = [
  { id: 0, name: "None" },
  { id: 1, name: "Grandway" },
  { id: 2, name: "JetFiber" },
  { id: 3, name: "Ilsinctech" },
  { id: 4, name: "Tekcn" },
  { id: 5, name: "Joinwit" },
  { id: 6, name: "Acer" },
];

const OpTipeSpecialTools = [
  { id: 1, name: "JW3202S" },
  { id: 2, name: "FHO3000" },
  { id: 3, name: "TC400" },
  { id: 4, name: "4018" },
  { id: 5, name: "H-5" },
  { id: 6, name: "Swift Kf-4" },
  { id: 7, name: "Think Pad" },
];

module.exports = {
  OpMerk,
  OpYear,
  OpStnk,
  opCondition,
  OpMerkSpecialTools,
  OpTipeSpecialTools,
  OpTypeKendaraan,
};
