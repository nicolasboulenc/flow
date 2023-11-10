"use strict";

class Flow_Solver {

	#dots
	#puzzle

	constructor() {
		this.dots = new Map()
		this.puzzle = null
	}

	solve(flow_puzzle) {

		this.dots = new Map()
		this.puzzle = flow_puzzle

		// find dots
		for(let cell of this.puzzle.grid) {
			if(cell.is_dot) {
				this.dots.push(cell)
			}
		}





		return this.puzzle
	}

	solve_next() {

	}

	check_hit_boundary(cell, direction) {
		// top
		if(cell.y === 0 && direction === "n") {
			return true;
		}
		else if(cell.y === row_count-1 && direction === "s") {
			return true;
		}
		else if(cell.x === 0 && direction === "w") {
			return true;
		}
		else if(cell.x === col_count-1 && direction === "e") {
			return true;
		}
	}
}

/*
class Cell {
	constructor(x, y) {
		this.x = x;
		this.y = y;
		this.entry = "";	// n, e, s, w
		this.exit = "";		// n, e, s, w
		this.is_dot = false;
		this.color_index = -1;
	}
};
*/
