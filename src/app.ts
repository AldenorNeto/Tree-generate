interface Coordinate {
    x: number;
    y: number;
};

interface CircleProps {
    coord: Coordinate;
    radius: number;
}

interface BranchProps {
    coord: Coordinate;
    angle: number;
    length: number;
    depth: number;
    firstSeed: number;
    stalk?: boolean;
}

class SeedGenerate {
    firstSeed(): number {
        const dsa = Math.random();
        console.log(dsa);
        return dsa
    }
}

class Circle {
    private centerX: number;
    private centerY: number;
    private radius: number;
    private circleElement: HTMLDivElement;

    constructor({ coord: { x: centerX, y: centerY }, radius }: CircleProps) {
        this.centerX = centerX;
        this.centerY = centerY;
        this.radius = radius;
        this.circleElement = this.createCircleElement();
        document.body.appendChild(this.circleElement);
    }

    private createCircleElement(): HTMLDivElement {
        const circleElement = document.createElement("div");
        circleElement.className = "circle";

        const diameter = this.radius * 2;

        circleElement.style.width = `${diameter}px`;
        circleElement.style.height = `${diameter}px`;
        circleElement.style.left = `${this.centerX - this.radius}px`;
        circleElement.style.top = `${this.centerY - this.radius}px`;

        return circleElement;
    }
}

class Branch {
    private startX: number;
    private startY: number;
    private angle: number;
    private length: number;
    private depth: number;
    private stalk: boolean;
    private pi: string;
    private calculatedEnd: Coordinate;
    private stringSeed: string;
    private branchElement: HTMLDivElement;

    constructor({
        coord: { x: startX, y: startY },
        angle,
        length,
        depth,
        firstSeed,
        stalk = false
    }: BranchProps) {
        this.startX = startX;
        this.startY = startY;
        this.angle = (Math.PI * angle) / 180;
        this.length = length;
        this.depth = depth;
        this.stalk = stalk;
        this.stringSeed = firstSeed.toString().replace('0.', '');
        this.branchElement = this.createBranchElement();
        this.calculatedEnd = this.calculateEndCoordinates();
        this.pi = Math.PI.toString().replace('.', '');

        document.body.appendChild(this.branchElement);
        const { seedShuffled, angleVariant } = this.seedShuffled()

        if (depth) {
            const firstSeed1 = Number('0.' + seedShuffled);
            const firstSeed2 = Number(
                firstSeed.toString().replace(
                    '0.',
                    '0.' + (Number(this.pi[Number(this.stringSeed[2])]) + Number(this.stringSeed[Number(this.stringSeed[6])]))
                )
            );
            if (this.stalk) {
                console.log({ firstSeed1, firstSeed2 });

            }

            new Branch({
                coord: this.calculatedEnd,
                angle: Number('0.' + angleVariant) * 180 + 180,
                length: this.length / 1.5 + 2,
                depth: this.depth - 1,
                firstSeed: firstSeed1
            });
            new Branch({
                coord: this.calculatedEnd,
                angle: (Number(this.stringSeed[Number(this.stringSeed[3])]) + Number(this.stringSeed[Number(this.stringSeed[8])]) / 20) * 260 + 100,
                length: this.length / 1.6 + 3,
                depth: this.stalk ? this.depth - 2 : this.depth - 1,
                firstSeed: firstSeed2
            });
        } else {
            new Circle({
                coord: this.calculatedEnd,
                radius: 10,
            });
        }
    }

    private seedShuffled(): { angleVariant: string, seedShuffled: string } {
        const angleVariant = [
            this.stringSeed[Number(this.stringSeed[10])],
            ...this.stringSeed.split('').reverse()
        ].join('');
        const seedShuffled = [
            ...['', '', '', '', '', '', '', '', ''].map((v, i) => angleVariant[Number(angleVariant[i])]),
            ...angleVariant.split('')
        ].slice(2, 30).join('');
        return { angleVariant, seedShuffled };
    }


    private calculateEndCoordinates(): Coordinate {
        return {
            x: this.startX + (this.length + this.depth) * Math.cos(this.angle),
            y: this.startY + (this.length + this.depth) * Math.sin(this.angle),
        };
    }

    private createBranchElement(): HTMLDivElement {
        const branchElement = document.createElement("div");
        branchElement.className = "branch";

        const endX = this.startX + this.length * Math.cos(this.angle);
        const endY = this.startY + this.length * Math.sin(this.angle);

        const deltaX = endX - this.startX;
        const deltaY = endY - this.startY;

        const length = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
        const angle = Math.atan2(deltaY, deltaX);

        branchElement.style.width = `${length}px`;
        branchElement.style.left = `${this.startX}px`;
        branchElement.style.top = `${this.startY}px`;
        branchElement.style.padding = `${(this.depth * 1.3) + 1}px`;
        branchElement.style.zIndex = this.stalk ? "1" : "3";

        branchElement.style.transform = `rotate(${angle}rad)`;
        return branchElement;
    }
}

class Floor {
    private height: number;
    private floorElement: HTMLDivElement;

    constructor(height: number) {
        this.height = height;
        this.floorElement = this.createFloorElement();
        document.body.appendChild(this.floorElement);
    }

    private createFloorElement(): HTMLDivElement {
        const floorElement = document.createElement("div");
        floorElement.style.position = "absolute";
        floorElement.style.width = "100%";
        floorElement.style.top = `${this.height}px`;
        floorElement.style.bottom = "0";
        floorElement.style.backgroundColor = "#386c42";
        floorElement.style.zIndex = "2";

        return floorElement;
    }
}

// Configurações da tela
const screenWidth = window.innerWidth * 0.6;  // 60% da largura da tela
const screenHeight = window.innerHeight * 0.8;  // 80% da altura da tela

// Profundidade da árvore
const profundidadeArvore = 10;  // Valor que renderiza um número quadrado de ramos

const seedGenerate = new SeedGenerate();

// Criação do chão
new Floor(screenHeight - profundidadeArvore);

// Criação do tronco principal da árvore
new Branch({
    coord: { x: screenWidth, y: screenHeight },
    angle: 240,  // Ângulo inicial da ramificação
    length: 150,  // Comprimento do tronco principal
    depth: profundidadeArvore,
    firstSeed: seedGenerate.firstSeed(),
    stalk: true,  // Indica que é o tronco principal
});