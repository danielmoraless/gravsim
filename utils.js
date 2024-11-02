/** 
 * Funcion para dibujar una "particula" en el contexto.
 * Una "particula" no es mas que un "cuadrado" de 1px * 1px.
*/
export function particle(ctx, x, y) {
    let verticeX = x > 0 ? x+1 : x-1;
    let verticeY = y > 0 ? y+1 : y-1;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(verticeX, verticeY);
    ctx.closePath();
    ctx.stroke();
}

/** 
 * Funcion para calcular las componentes Vx y Vy de la velocidad.
*/
export function calcular_vc(particleList) {
    particleList.forEach((par, i, list) => {
        // Calculo del angulo en radianes
        list[i].angle_rads = par.angle * (Math.PI / 180);

        // Calculo de las componentes del vector velocidad inicial
        list[i].vx = par.v * Math.cos(par.angle_rads);
        list[i].vy = par.v * Math.sin(par.angle_rads);
    });
}

/** 
 * Funcion generica para mover particulas con velocidad angular y aceleracion
*/
export function generic_move(ctx, particleList, dt) {
    for (let i = 0; i < particleList.length; i++) {
        particle(ctx, particleList[i].x, particleList[i].y);
        particleList[i].angle -= 10*(i+1);
        calcular_vc(particleList);
        particleList[i].x += (particleList[i].vx*dt)+((1/2)*(1e-5)*Math.pow(dt, 2));
        particleList[i].y += (particleList[i].vy*dt)+((1/2)*(0)*Math.pow(dt, 2));
        //console.log(Math.sqrt(Math.pow(particleList[i].x, 2) + Math.pow(particleList[i].y, 2)))
    }
}

export function get_distance(p1, p2) {
    return Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2));
}

export function get_rad_angle(p1, p2) {
    return Math.atan((p2.y - p1.y)/(p2.x - p1.x));
}

export function calc_grav_forces(particleList, g_constant, dt) {
    for (let i = 0; i < particleList.length; i++) {
        for (let j = 0; j < particleList.length; j++) {
            if (j == i) continue;

            // Calcular la distancia y el angulo (en radianes)
            let d = get_distance(particleList[i], particleList[j]);
            let theta = get_rad_angle(particleList[i], particleList[j]);

            // Calcular el modulo de la fuerza y sus componentes
            let F = g_constant * ((particleList[i].mass * particleList[j].mass) / Math.pow(d, 2))
            let Fx = F * Math.cos(theta);
            let Fy = F * Math.sin(theta);

            // Calcular la aceleracion y sus componentes
            let a = F / particleList[i].mass;
            let ax = a * Math.cos(theta);
            let ay = a * Math.sin(theta);

            particleList[i].x = (particleList[i].vx*dt)+((1/2)*(ax)*Math.pow(dt, 2));
            particleList[i].y = (particleList[i].vy*dt)+((1/2)*(ay)*Math.pow(dt, 2));

            //console.log(particleList[i].x, particleList[i].y);
        }
    }
}