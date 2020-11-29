import './jquery.svg.min';
import './jquery.svganim.min';

$(document).ready(function() {

  // Graphs
  const widthVw = 0.75; // in vw
  const widthVh = 0.5; // in vh
  let vw, vh;
  if (window.innerWidth !== undefined && window.innerHeight !== undefined) {
    vw = window.innerWidth;
    vh = window.innerHeight;
  } else {
    vw = document.documentElement.clientWidth;
    vh = document.documentElement.clientHeight;
  }

  const vwToPx = (sizeInVw) => sizeInVw * vw;
  const vhToPx = (sizeInVh) => sizeInVh * vh;

  const numTicksX = 9;
  const numTicksY = 10;
  const tickSizeVw = widthVw / numTicksX;
  const tickSizeVh = widthVh / numTicksY;
  const axisLengthXPx = vwToPx(widthVw - tickSizeVw);
  const axisLengthYPx = vhToPx(widthVh - tickSizeVh);


  $('#fullpage').fullpage({
    anchors: ['intro', 'child-mortality', 'life-expectancy', 'extreme-poverty', 'world-gdp', 'literacy', 'challenges', 'you-have-the-power-to-help', 'do-it-today', 'footer'],
    sectionsColor: ['#F2F2F2', '#D6D6D6', '#F2F2F2', '#D6D6D6', '#F2F2F2', '#D6D6D6', '#F2F2F2', '#D6D6D6', '#F2F2F2', '#1B1C1C'],
    navigation: true,
    navigationPosition: 'right',
    navigationTooltips: ['Introduction', 'Child Mortality', 'Life Expectancy', 'Extreme Poverty', 'World\'s GDP', 'Literacy', 'Challenges', 'How you can help', 'Do it today'],
    responsiveHeight: 666,
    afterLoad: function(anchorLink, index) {
      let section = '#section' + index;
      //todo: fix the selection below
      let rect = $(section + ' > div > div.container > div.flip > div > svg > g > rect');
      setTimeout(function() {
        rect.animate({ svgWidth: 0 }, 2000, 'linear');
      }, 2000);
    },
    onLeave: function(anchorLink, index) {
      let section = '#section' + index;
      let rect = $(section + ' > div > div.container > div.flip > div > svg > g > rect');
      rect.attr('width', axisLengthXPx + 20);
    }
  });

  $('.zoom-in').css('transform', 'scale(1.2)');

  //I was playing around with animations
  //the idea was that if you mouse over on left-hand shape all shapes move slowly to right
  //and if you mouse over on right-hand shape all shapes move slowly to left
  //but I don't have the patience now to figure it out
  //feel free to pick it up :)
  /*
  $('.polygonal-shape-left')
      .mouseover(() => {
          console.log('mouse over left');
          $('.polygonal-shape-left').css('left', '-400px');
          $('.polygonal-shape-center').css('left', '80px');
          $('.polygonal-shape-right').css('left', '970px');
      })
      .mouseout(() => {
          console.log('mouse out left');
          $('.polygonal-shape-left').css('left', '-470px')
          $('.polygonal-shape-center').css('left', '60px');
          $('.polygonal-shape-right').css('left', '900px')
      })
  $('.polygonal-shape-right')
      .mouseover(() => {
          console.log('mouse over right');
          $('.polygonal-shape-left').css('left', '-530px');
          $('.polygonal-shape-center').css('left', '40px');
          $('.polygonal-shape-right').css('left', '830px');
      })
      .mouseout(() => {
          console.log('mouse out right');
          $('.polygonal-shape-left').css('left', '-470px')
          $('.polygonal-shape-center').css('left', '60px');
          $('.polygonal-shape-right').css('left', '900px')
      })
   */




  const drawGraph = (container, data, statLabel, yScale = [0, 100]) => {

    const minYear = d3.min(data, d => d.year);
    const maxYear = d3.max(data, d => d.year);

    let x = d3.scaleLinear().domain([minYear, maxYear]).range([0, axisLengthXPx]);
    let y = d3.scaleLinear().domain(yScale).range([axisLengthYPx, 0]);

    let xAxis = d3.axisBottom(x)
      .tickFormat(d3.format('d'));
    let yAxis = d3.axisLeft(y);

    let xAxisGrid = d3.axisBottom(x)
      .ticks(numTicksX)
      .tickSize(axisLengthYPx, 0)
      .tickFormat('');

    let yAxisGrid = d3.axisRight(y)
      .ticks(numTicksY)
      .tickSize(axisLengthXPx, 0)
      .tickFormat('');

    //it assumes the background color of the rectangle should be the background color of div.container
    //which is two levels above the graph container div -- div.container > div.flip > container
    let backgroundColor = d3.select(container)
      .select(function() {
        return this.parentNode;
      })
      .select(function() {
        return this.parentNode;
      })
      .style('background-color');

    let svg = d3.select(container)
      .append('svg')
      .attr('width', vwToPx(widthVw + tickSizeVw))
      .attr('height', vhToPx(widthVh + tickSizeVh));

    let chartGroup = svg.append('g')
      .attr('transform', `translate(${vwToPx(tickSizeVw)}, ${vhToPx(tickSizeVh)})`);

    let line = d3.line()
      .x(d => x(d.year))
      .y(d => y(d[statLabel]));

    let area = d3.area()
      .x(d => x(d.year))
      .y0(axisLengthYPx)
      .y1(d => y(d[statLabel]));

    const defs = svg.append('defs');

    const redGradient = defs.append('linearGradient')
      .attr('id', 'redGradient')
      .attr('x1', '0%')
      .attr('y1', '0%')
      .attr('x2', '100%')
      .attr('y2', '100%')
      .attr('spreadMethod', 'pad');
    redGradient.append('stop')
      .attr('offset', '0%')
      .attr('stop-color', '#c00')
      .attr('stop-opacity', 1);
    redGradient.append('stop')
      .attr('offset', '100%')
      .attr('stop-color', backgroundColor)
      .attr('stop-opacity', '0.2');

    const greenGradient = defs.append('linearGradient')
      .attr('id', 'greenGradient')
      .attr('x1', '0%')
      .attr('y1', '0%')
      .attr('x2', '100%')
      .attr('y2', '100%')
      .attr('spreadMethod', 'pad');
    greenGradient.append('stop')
      .attr('offset', '0%')
      .attr('stop-color', backgroundColor)
      .attr('stop-opacity', '0.2');
    greenGradient.append('stop')
      .attr('offset', '100%')
      .attr('stop-color', '#008000')
      .attr('stop-opacity', 1);

    let gradient;
    if (data[0][statLabel] > data.slice(-1)[0][statLabel]) {
      gradient = 'url(#redGradient)';
    } else {
      gradient = 'url(#greenGradient)';
    }

    let tooltip = d3.select('body')
      .append('div')
      .attr('class', 'graph-tooltip')
      .text('a simple tooltip');

    chartGroup.append('path')
      .attr('d', area(data))
      .style('fill', gradient)
      .style('fill-opacity', '0.6')
      .style('stroke-width', '0');

    chartGroup.append('path')
      .attr('d', line(data))
      .attr('class', 'graph-line');

    let graphDots = chartGroup.append('g')
      .attr('class', 'graph-dot')
      .attr('width', vwToPx(widthVw))
      .attr('height', vhToPx(widthVh));

    // hack for getting the group started at 0
    graphDots.append('circle')
      .attr('r', 1)
      .attr('cx', 0)
      .attr('cy', 0);

    graphDots.selectAll('.circle').data(data)
      .enter()
      .append('circle')
      .attr('r', 3)
      // I can't make them animate, so I've made them invisible ....
      .attr('fill-opacity', 1)
      .style('fill', '#fff')
      .attr('cx', d => x(d.year))
      .attr('cy', d => y(d[statLabel]))
      // & with tooltip
      .on('mouseover', function(event) {
        tooltip.style('visibility', 'visible');
        tooltip.text(`${event.year}: ${event[statLabel]}`);
      })
      .on('mousemove', function() {
        tooltip.style('top', (d3.event.pageY - 50) + 'px').style('left', (d3.event.pageX) + 'px');
      })
      .on('mouseout', function() {
        return tooltip.style('visibility', 'hidden');
      });


    chartGroup.append('rect')
      .attr('x', -1 * (axisLengthXPx + 20))
      .attr('y', -1 * axisLengthYPx)
      .attr('height', axisLengthYPx) // Fix something here so that the last dot is properly hidden
      .attr('width', axisLengthXPx + 20)
      .attr('fill', backgroundColor)
      .attr('transform', 'rotate(180)');

    chartGroup.append('g').attr('transform', `translate(0, ${vhToPx(tickSizeVh * (numTicksY - 1))})`).call(xAxis);
    chartGroup.append('g').call(yAxis);

    chartGroup.append('g').call(yAxisGrid).attr('class', 'axis-grid');
    chartGroup.append('g').call(xAxisGrid).attr('class', 'axis-grid');

  };

  d3.csv('/assets/datasets/child-mortality.csv').then(data => {
    drawGraph('#child-mortality-graph-container', data, 'notSurvivingFiveYears');
  });

  d3.csv('/assets/datasets/life-expectancy-in-uk.csv').then(data => {
    drawGraph('#life-expectancy-graph-container', data, 'lifeExpectancyInUK');
  });

  d3.csv('/assets/datasets/extreme-poverty-percentage.csv').then(data => {
    drawGraph('#extreme-poverty-graph-container', data, 'extremePovertyPercentage');
  });

  d3.csv('/assets/datasets/gdp.csv').then(data => {
    drawGraph('#gdp-graph-container', data, 'gdp', [1000, 15000]);
  });

  d3.csv('/assets/datasets/literate-illiterate.csv').then(data => {
    drawGraph('#literacy-graph-container', data, 'literatePercentage');
  });

});


particlesJS('particles-js', {
  'particles': {
    'number': {
      'value': 20,
      'density': {
        'enable': true,
        'value_area': 800
      }
    },
    'color': {
      'value': '#ffffff'
    },
    'shape': {
      'type': 'circle',
      'stroke': {
        'width': 0,
        'color': '#000000'
      },
      'polygon': {
        'nb_sides': 5
      },
    },
    'opacity': {
      'value': 0.5,
      'random': false,
      'anim': {
        'enable': false,
        'speed': 1,
        'opacity_min': 0.1,
        'sync': false
      }
    },
    'size': {
      'value': 3,
      'random': true,
      'anim': {
        'enable': false,
        'speed': 30,
        'size_min': 0.1,
        'sync': false
      }
    },
    'line_linked': {
      'enable': true,
      'distance': 150,
      'color': '#ffffff',
      'opacity': 0.4,
      'width': 1
    },
    'move': {
      'enable': true,
      'speed': 4,
      'direction': 'none',
      'random': false,
      'straight': false,
      'out_mode': 'out',
      'bounce': false,
      'attract': {
        'enable': false,
        'rotateX': 600,
        'rotateY': 1200
      }
    }
  },
  'interactivity': {
    'detect_on': 'canvas',
    'events': {
      'onhover': {
        'enable': true,
        'mode': 'grab'
      },
      'onclick': {
        'enable': true,
        'mode': 'push'
      },
      'resize': true
    },
    'modes': {
      'grab': {
        'distance': 140,
        'line_linked': {
          'opacity': 1
        }
      },
      'bubble': {
        'distance': 400,
        'size': 40,
        'duration': 2,
        'opacity': 8,
        'speed': 3
      },
      'repulse': {
        'distance': 200,
        'duration': 0.4
      },
      'push': {
        'particles_nb': 4
      },
      'remove': {
        'particles_nb': 2
      }
    }
  },
  'retina_detect': true
});