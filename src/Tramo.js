class Tramo {
  constructor(obsCarril1, obsCarril2, obsCarril3) {
    this.obsCarril1 = obsCarril1;
    this.obsCarril2 = obsCarril2;
    this.obsCarril3 = obsCarril3;
  }

  ///este es el control de tramos, quedo medio obsoleto porque en un principio el juego se habie pensado
  // para que bifurcaciones, pero termino siendo lineal
  getTramo(lane) {
    if (lane == "CARRIL1") {
      return this.obsCarril1;
    } else {
      if (lane == "CARRIL2") {
        return this.obsCarril2;
      } else {
        return this.obsCarril3;
      }
    }
  }
}
