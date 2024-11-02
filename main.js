import { particle, calcular_vc, calc_grav_forces } from './utils.js';

const canvas = document.querySelector("canvas");
var ctx = canvas.getContext("2d");

const cw = canvas.width = window.innerWidth - 10;
const ch = canvas.height = window.innerHeight - 10;
const G = 6.67430e-11;


var particleList = [
    {
        x: -cw/2, y: 0,
        vx: undefined, vy: undefined, v: 0.2,
        angle: 0, angle_rads: undefined,
        mass: 5,
    },
    {
        x: -cw/2, y: -ch/4,
        vx: undefined, vy: undefined, v: 0.2,
        angle: 0, angle_rads: undefined,
        mass: 10,
    }
];

var ti = 0; // tiempo inicial (milisegundos)
var dt = 0; // tiempo transcurrido (segundos)
var cleanScreen = true;

function setup() {
    // Transformacion al plano cartesiano
    ctx.translate(cw/2, ch/2);
    ctx.scale(1, -1);

    ctx.strokeStyle = "#fff";
    ctx.fillStyle = ctx.strokeStyle;

    // Calculo de los valores iniciales para cada particula
    calcular_vc(particleList);

    ti = Date.now();

    // Cuando la tecla KeyH es presionada, activa o desactiva el borrado del canvas.
    document.addEventListener("keydown", (e) => {
        if (e.code === "KeyH") cleanScreen ? cleanScreen = false : cleanScreen = true;
    });
}

function loop() {
    if (cleanScreen) ctx.clearRect(-cw/2, ch/2, cw, -ch);;

    dt = (Date.now() - ti) / 1000;

    // Dibujar todas las particulas en su posicion inicial
    particleList.forEach((par) => {
        particle(ctx, par.x, par.y);
    });

    calc_grav_forces(particleList, G, dt);

    window.requestAnimationFrame(loop);
}

console.log(particleList)
setup();
window.requestAnimationFrame(loop);