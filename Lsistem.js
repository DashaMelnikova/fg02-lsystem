        function getIteration(stroke){
            var result = "";
            for (var i = 0; i < stroke.length; ++i){
                var symbol = stroke.charAt(i);
                if (symbol == 'F'){ result += getRule(); }
                else { result += symbol; }
            }
            return result;
        }
		
        function Point(x,y,angle){
            this.x = x;
            this.y = y;
            this.angle = angle;
            return this;
        }
		
        function draw(x, y, x1, y1, context){
            context.beginPath();
            context.moveTo(x, y);
            context.lineTo(x1, y1);
            context.stroke();
        }
		
        function getAxiom(a, iter){
			var axiom = "";
            if (a == 0) { axiom = "F"; }
			else { axiom = "[F]+[F]+[F]+[F]+[F]+[F]"; }
			for (var i = 0; i < iter; ++i) {
                axiom = getIteration(axiom);
            }
            return axiom;
        }
		
		function getRule(){
			var r = Number(document.getElementById("rule").value);
			var rule = "";
            if (r == 0) { rule = "-F+F+[+F-F-]-[-F+F+F]"; }
			else { rule = "F[+FF][-FF]FF[+F][-F]FF"; }
            return rule;
        }

        function getFractal(axiom, iter, angle0, x, y, step, angle) {
            axiom = getAxiom(axiom, iter);
            step = step/(iter/2);
            var spots = [];
			var a = angle;
            var canvas = document.getElementById("canvas");
            var canvasHeight = parseInt(canvas.getAttribute("height"));
            var canvasWidth = parseInt(canvas.getAttribute("width"));
            var context = canvas.getContext('2d');
            context.lineWidth = "1";
            context.strokeStyle = "#9901FF";
			context.fillStyle = "#F8F0FF";
            context.fillRect(0,0,canvasWidth,canvasHeight);
             for (var i = 0; i < axiom.length; ++i) {
                switch (axiom.charAt(i)){
                    case '+': angle0 += a; break;
                    case '-': angle0 -= a; break;
                    case '[': spots.push(new Point(x, y, angle0)); break;
                    case ']': {
                        var point = spots.pop();
                        x = point.x;
                        y = point.y;
                        angle0 = point.angle;
                        break;
                    }
                    case 'F': {
                        var x1 = x + step*Math.cos(angle0);
                        var y1 = y - step*Math.sin(angle0);
                        draw(x, y, x1, y1, context);
                        x = x1;
                        y = y1;
                        break;
                    }
                }
            }
        }
		
        function run(){
            var axiom = Number(document.getElementById("axiom").value);
            var iter = document.getElementById("iter");
            var x = Number(document.getElementById("x0").value);
			if (x == 0) {x = 200;}
			else {x = 350;}
            var y = Number(document.getElementById("y0").value);
			if (y == 0) {y = 600;}
			else {y = 350;}
			var angle = Number(document.getElementById("angle").value);
			if (angle == 0) {angle = 22 * (Math.PI / 180);}
			else {angle = 60 * (Math.PI / 180);}
            var a0 = document.getElementById("angle0");
			angle0 = a0.value * (Math.PI / 180);
            var step = document.getElementById("step");
            getFractal(axiom, parseInt(iter.value), angle0, x, y, parseInt(step.value), angle);
        }
