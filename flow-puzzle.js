"use strict";

class Flow_Puzzle {

	constructor() {

		this.rows = 0;
		this.cols = 0;
		this.grid = [];

		this.init(this.cols, this.rows);
	}

	init(cols, rows) {

		this.cols = cols;
		this.rows = rows;

		// init grid
		this.grid = [];
		for(let y=0; y<this.rows; y++) {
			for(let x=0; x<this.cols; x++) {
				const cell = new Cell(x, y)
				this.grid.push(cell);
			}
		}
	}

	load(config) {

		this.init(config.cols, config.rows);
		for(let elem of config.elems) {
			const index = elem.y * this.cols + elem.x;
			this.grid[index].is_dot = (elem.type === "dot");
			this.grid[index].color_index = elem.color_index;
		}
	}

	clear() {

		for(let cell of this.grid) {
			cell.entry = "";
			cell.exit = "";
			if(cell.is_dot === false) {
				cell.color_index = -1;
			}
		}
	}

	next_cell(cell, which_way="exit") {
		// returns next cell in an existing path
		const next_inc = {
			n: { x: +0, y: -1 },
			e: { x: +1, y: +0 },
			s: { x: +0, y: +1 },
			w: { x: -1, y: +0 }
		};

		const dir = cell[which_way];
		if(dir === "") return null;

		const inc = next_inc[dir];
		const next_cell = this.grid[(cell.y + inc.y)* this.cols + (cell.x + inc.x)];

		return next_cell;
	}

	get_flows() {

		const flows = [];

		for(let cell of this.grid) {

			if(cell.is_dot === true && cell.exit !== "") {

				let n_cell = this.next_cell(cell, "exit");
				while(n_cell !== null && n_cell.is_dot === false) {
					n_cell = this.next_cell(n_cell, "exit");
				}

				if(n_cell !== null && n_cell.is_dot === true) {
					flows.push(cell);
				}
			}
		}
		return flows;
	}
	
	get_coverage() {
		let cell_count = 0;
		let cell_cover = 0;
		for(let cell of this.grid) {
			cell_count++
			if(cell.color_index !== -1) {
				cell_cover++
			}
		}
		return cell_cover / cell_count
	}

	is_completed() {

		let is_complete = true;
		for(let cell of this.grid) {

			if(cell.is_dot === true) {

				let which_way = "exit";
				if(cell.exit === "") {
					which_way = "entry";
				}

				let n_cell = this.next_cell(cell, which_way);
				while(n_cell !== null && n_cell.is_dot === false) {
					n_cell = this.next_cell(n_cell, which_way);
				}

				if(n_cell === null) {
					is_complete = false;
					break;
				}
			}
		}
		return is_complete;
	}
};

class Cell {

	constructor(x, y) {
		this.x = x;
		this.y = y;
		this.entry = "";	// n, e, s, w
		this.exit = "";		// n, e, s, w
		this.type = "";
		this.is_dot = false;
		this.color_index = -1;
	}
};