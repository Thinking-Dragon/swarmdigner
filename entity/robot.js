class Robot {
    update(grid) {
        const targetPosition = this.chooseBlock(grid);
        
        if(targetPosition.x >= 0 && targetPosition.x < grid.length && targetPosition.y >= 0 && targetPosition.y < grid.length) {
            this.position.x = targetPosition.x;
            this.position.y = targetPosition.y;
        }
    }

    render(ctx) {
        ctx.beginPath();
        ctx.drawImage(droneImage, this.position.x * this.size, this.position.y * this.size, this.size, this.size);
        ctx.stroke();
    }

    getBlock(grid, x, y) {
        if(x >= 0 && x < grid.length && y >= 0 && y < grid.length)
            return grid[x][y];
        else
            return 0;
    }

    chooseBlock(grid){
        const x = this.position.x;
        const y = this.position.y;
    
        // 5 6 7
        // 3   4
        // 0 1 2

        const blocks = [this.getBlock(grid, x-1, y-1), this.getBlock(grid, x, y-1), this.getBlock(grid, x+1, y-1), this.getBlock(grid, x-1, y), this.getBlock(grid, x+1, y), this.getBlock(grid, x-1, y+1), this.getBlock(grid, x, y+1), this.getBlock(grid, x+1, y+1)];
    
        let seed = Math.random() * blocks.reduce((item, acc) => item + acc, 0);
        let count = 0;

        while (seed > 0) seed -= blocks[count++];
    
        switch(count) {
            case 0: return { x: x - 1, y: y - 1 };
            case 1: return { x: x,     y: y - 1 };
            case 2: return { x: x + 1, y: y - 1 };
            case 3: return { x: x - 1, y: y     };
            case 4: return { x: x + 1, y: y     };
            case 5: return { x: x - 1, y: y + 1 };
            case 6: return { x: x,     y: y + 1 };
            case 7: return { x: x + 1, y: y + 1 };
        }
    
        return { x: x, y: y };
    }

    position = { x: 0, y: 0 };
    size = parameters.square_size;

    constructor(x = 0, y = 0) {
        this.position.x = x;
        this.position.y = y;
    }
}
    





