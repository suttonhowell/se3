export const Relation = () => {
  const start = { x: 50, y: 50 };
  const end = { x: 200, y: 60 };
  const hideDots = true;
  const arrowHeadXOffset = 0;
  const arrowHeadYOffset = 3;
  const arrowPointOffset = 6;

  const h = Math.sqrt((end.x - start.x) ** 2 + (end.y - start.y));
  const angle = Math.atan2(end.y - start.y, end.x - start.x) * (180 / Math.PI);

  return (
    <g id="relation" transform="translate(0,0)" style={{ visibility: 'visible' }}>
      <path
        d={`M ${start.x} ${start.y} L ${end.x} ${end.y}`}
        fill="none"
        stroke="rgb(255, 255, 255)"
        // stroke-miterlimit="10"
        // pointer-events="stroke"
      ></path>
      <path
        d={`M ${end.x} ${end.y} L ${end.x - arrowHeadXOffset} ${end.y - arrowHeadYOffset} L ${
          end.x + arrowPointOffset
        } ${end.y} L ${end.x - arrowHeadXOffset} ${end.y + arrowHeadYOffset} Z`}
        fill="rgb(255, 255, 255)"
        stroke="rgb(255, 255, 255)"
        transform={`rotate(${angle},${end.x},${end.y})`}
        // stroke-miterlimit="10"
        // pointer-events="all"
      ></path>
      {/* Start */}
      <circle
        cx={end.x}
        cy={end.y}
        r="2"
        fill="red"
        visibility={hideDots ? 'hidden ' : 'visible'}
      />
      {/* Up and back */}
      <circle
        cx={end.x - arrowHeadXOffset}
        cy={end.y - arrowHeadYOffset}
        r="2"
        fill="red"
        visibility={hideDots ? 'hidden ' : 'visible'}
      />
      {/* Arrowpoint */}
      <circle
        cx={end.x + arrowPointOffset}
        cy={end.y}
        r="2"
        fill="red"
        visibility={hideDots ? 'hidden ' : 'visible'}
      />
      {/* Down and up */}
      <circle
        cx={end.x - arrowHeadXOffset}
        cy={end.y + arrowHeadYOffset}
        r="2"
        fill="red"
        visibility={hideDots ? 'hidden ' : 'visible'}
      />
    </g>
  );
};
