export default {
    data: {
        score: 0, // 表示当前的分数
        space: 16, // 表示当前剩余的空格块数
        num_size: { //不同数字的大小信息
            "0": "30",
            "2": "30",
            "4": "30",
            "8": "30",
            "16": "30",
            "32": "30",
            "64": "30",
            "128": "25",
            "256": "25",
            "512": "25",
            "1024": "20",
            "2048": "20"
        },
        map: [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]],
        num_color: { //不同数字的颜色信息
            "0": "#ccc0b3",
            "2": "#eee4da",
            "4": "#ede0c8",
            "8": "#f2b179",
            "16": "#f59563",
            "32": "#f67c5f",
            "64": "#ec6544",
            "128": "#e44d29",
            "256": "#edcf72",
            "512": "#c8a145",
            "1024": "#a8832b",
            "2048": "#86aa9c"
        },
        offsetx: { //不同数字的偏移量（为了将数字画在方块中心）
            "0": 21.5,
            "2": 25,
            "4": 25,
            "8": 25,
            "16": 17,
            "32": 17.5,
            "64": 17.5,
            "128": 14,
            "256": 14,
            "512": 14,
            "1024": 12,
            "2048": 12.5
        }
    },
    onShow() {
        this.produce();
        this.produce();
    },
    formap(func) {
        for (var i = 0;i < 4; i++) {
            for (var j = 0;j < 4; j++) {
                func(i,j);
            }
        }
    },
    produce() {
        var cot = ~~(Math.random() * this.space);
        var k = 0;
        this.formap((i, j) => {
            if (this.map[i][j] == 0) {
                if (cot == k) {
                    this.map[i][j] = 2;
                    this.draw();
                }
                k += 1;
            }
        });
        this.space -= 1;
    },
    draw() {
        const canvas = this.$element('myCanvas');
        const ctx = canvas.getContext('2d');

        this.formap((i, j) => {
            var num = this.map[i][j];
            ctx.fillStyle = this.num_color[parseInt(num)];
            ctx.fillRect(j * 60 + 10, i * 60 + 10, 50, 50);
            if (num != 0) {
                ctx.font = "bold " + this.num_size[parseInt(num)] + "px";
                ctx.fillStyle = (num <= 4) ? "#776e65" : "white";
                ctx.fillText(String(this.map[i][j]),
                j * 60 + this.offsetx[parseInt(num)],
                i * 60 + 35 + this.num_size[parseInt(num)] / 3);
            }
        });
    },
    modify(x, y, dir) {
        var tx = x, ty = y;
        if (dir[0] == 0) {
            tx = [ty, ty = tx][0];
        }
        if (dir[1] > 0) {
            tx = 3 - tx;
        }
        if (dir[0] > 0) {
            ty = 3 - ty;
        }

        return [tx, ty];
    },
    move(dir) {
        for (var i = 0;i < 4; i++) {
            var tmp = Array();
            var isadd = false;
            for (var j = 0;j < 4; j++) {
                var ti = this.modify(i,j,dir)[0], tj = this.modify(i,j,dir)[1];
                if (this.map[ti][tj] != 0) {
                    if (!isadd && this.map[ti][tj] == tmp[tmp.length - 1]) {
                        this.score += (tmp[tmp.length - 1] *= 2);
                        isadd = true;
                        this.space += 1;
                    }
                    else {
                        tmp.push(this.map[ti][tj]);
                    }
                }
            }
            for (var j = 0; j < 4; j++) {
                var ti = this.modify(i,j,dir)[0], tj = this.modify(i,j,dir)[1];
                this.map[ti][tj] = isNaN(tmp[j]) ? 0 : tmp[j];
            }
        }
        this.produce();
        //        if (this.space == 0)alert("game over");
        this.draw();
    },
    moveUp() {
        this.move([0, -1]);
    },
    moveDown() {
        this.move([0, 1]);
    },
    moveLeft() {
        this.move([-1, 0]);
    },
    moveRight() {
        this.move([1, 0]);
    }
}
