
class Scene {
    update() {
        this.entities.forEach(entity => entity.update(this.getCurrentGrid()));
    }

    render(ctx) {
        //create grid
        ctx.fillStyle = "white";
        let L  = parameters.grid_size;
        ctx.strokeStyle = "black";
        ctx.fillRect(0, 0, L, L);

        for (let i = 0; i <parameters.grid_size ; i += parameters.square_size) {
            for (let j = 0; j < parameters.grid_size; j +=parameters.square_size) {
                ctx.fillStyle = `rgb(
                    ${Math.floor(this.getCurrentGrid()[i][j] * 40000000)},
                    0,
                    0)`;
                ctx.fillRect(i, j, parameters.square_size, parameters.square_size);
            }
        }

        //update robots
        this.entities.forEach(entity => entity.render(ctx));
    }

    colorizeSquare(probability) {
        return `rgba(0, 0, 255, ${probability})`;
    }

    addEntity(entity) {
        this.entities.push(entity);
    }

    create_grid(gridSize) {
        let grid = [];
        for (let x = 0; x < gridSize; x++) {
            grid[x] = [];
            for (let y = 0; y < gridSize; y++) {
                grid[x][y] = waveFunction(x,y, gridSize);
            }
        }
        return grid;
    }
    
    getCurrentGrid() {
        return this.grid;
    }
    
    grid = create_grid(parameters.grid_size);

    entities = []
}


// 2D particle in a box
// https://chem.libretexts.org/Bookshelves/Physical_and_Theoretical_Chemistry_Textbook_Maps/Supplemental_Modules_(Physical_and_Theoretical_Chemistry)/Quantum_Mechanics/05.5%3A_Particle_in_Boxes/Particle_in_a_2-Dimensional_Box
function waveFunction (x,y, gridSize){
    return Math.pow((2/gridSize) * Math.sin(7 * Math.PI * x / gridSize) * Math.sin(1 * Math.PI * y / gridSize),2);
}


// create a 2D array of size gridSize x gridSize
function create_grid(gridSize) {
    let grid = [];
    for (let x = 0; x < gridSize; x++) {
        grid[x] = [];
        for (let y = 0; y < gridSize; y++) {
            grid[x][y] = waveFunction(x,y, gridSize);
        }
    }
    // console.log(grid);
    return grid;
}
