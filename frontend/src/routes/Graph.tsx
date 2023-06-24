import { ExperimentalWarning } from '@/components/ExperimentalWarning'
import { Affix, rem, useMantineTheme } from '@mantine/core'
import CytoscapeComponent from 'react-cytoscapejs'
import Cola from 'cytoscape-cola'
import Cytoscape from 'cytoscape'
import { useState } from 'react'

Cytoscape.use(Cola)

function createGraph(n: number, prefix = '') {
  const nodes = new Array(n)
  const edges = new Array(n)
  for (let i = 0; i < n; i++) {
    nodes[i] = {
      data: {
        id: `${prefix}${i}`,
      },
    }
    edges[i] = {
      data: {
        source: `${prefix}${Math.floor(Math.sqrt(i))}`,
        target: `${prefix}${i + 1}`,
      },
    }
  }
  edges.pop()

  return nodes.concat(edges)
}

export default function Graph() {
  const [cy, setCy] = useState<Cytoscape.Core | null>(null)
  const theme = useMantineTheme()
  const elements = createGraph(100, 'a')
    .concat(createGraph(0, 'b'))
    .concat(createGraph(0, 'c'))
    .concat(createGraph(0, 'd'))

  const stylesheet = [
    // the stylesheet for the graph
    {
      selector: 'node',
      style: {
        'background-color':
          theme.colorScheme === 'dark' ? theme.colors.dark[2] : theme.colors.gray[7],
      },
    },

    {
      selector: 'edge',
      style: {
        width: 3,
        'line-color': theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[4],
        'source-distance-from-node': '3px',
        'target-distance-from-node': '3px',
        'curve-style': 'bezier',
      },
    },
  ]
  const layout = {
    name: 'cola',
    animate: true, // whether to show the layout as it's running
    infinite: true, // whether the simulation should end
    maxSimulationTime: 0 * 60 * 1000, // max length in ms to run the layout, does not apply if infinite: true
    refresh: 1, // number of ticks per frame; higher is faster but more jerky
    ungrabifyWhileSimulating: false, // so you can't drag nodes during layout
    fit: true, // on every layout reposition of nodes, fit the viewport
    padding: 30, // padding around the simulation
    boundingBox: undefined, // constrain layout bounds; { x1, y1, x2, y2 } or { x1, y1, w, h }
    nodeDimensionsIncludeLabels: false, // whether labels should be included in determining the space used by a node
    // layout event callbacks
    ready: function () {}, // on layoutready
    stop: function () {}, // on layoutstop

    // positioning options
    randomize: true, // use random node positions at beginning of layout
    avoidOverlap: true, // if true, prevents overlap of node bounding boxes
    handleDisconnected: true, // if true, avoids disconnected components from overlapping
    convergenceThreshold: 0.01, // when the alpha value (system energy) falls below this value, the layout stops
    nodeSpacing: function (node) {
      return 10
    }, // extra spacing around nodes
    flow: undefined, // use DAG/tree flow layout if specified, e.g. { axis: 'y', minSeparation: 30 }
    // relative alignment constraints on nodes, e.g. {vertical: [[{node: node1, offset: 0}, {node: node2, offset: 5}]], horizontal: [[{node: node3}, {node: node4}], [{node: node5}, {node: node6}]]}
    alignment: cy
      ? {
          vertical: [
            [{ node: cy.$id('a0') }, { node: cy.$id('a1') }],
            [{ node: cy.$id('a1') }, { node: cy.$id('a2') }],
            [{ node: cy.$id('a2') }, { node: cy.$id('a3') }],
          ],
          horizontal: [
            [{ node: cy.$id('a2') }, { node: cy.$id('a4') }],
            [{ node: cy.$id('a4') }, { node: cy.$id('a5') }],
            [{ node: cy.$id('a5') }, { node: cy.$id('a6') }],
          ],
        }
      : undefined,
    // list of inequality constraints for the gap between the nodes, e.g. [{"axis":"y", "left":node1, "right":node2, "gap":25}]
    gapInequalities: undefined,
    centerGraph: true, // adjusts the node positions initially to center the graph (pass false if you want to start the layout from the current position)

    // different methods of specifying edge length
    // each can be a constant numerical value or a function like `function( edge ){ return 2; }`
    edgeLength: undefined, // sets edge length directly in simulation
    edgeSymDiffLength: undefined, // symmetric diff edge length in simulation
    edgeJaccardLength: undefined, // jaccard edge length in simulation

    // iterations of cola algorithm; uses default values on undefined
    unconstrIter: undefined, // unconstrained initial layout iterations
    userConstIter: undefined, // initial layout iterations with user-specified constraints
    allConstIter: undefined, // initial layout iterations with all constraints including non-overlap
  }
  cy?.nodes('[id = "a0"],[id = "a2"],[id = "a3"],[id = "a4"],[id = "a5"],[id = "a6"]').style(
    'background-color',
    theme.colors.blue[5],
  )

  return (
    <>
      <Affix position={{ top: rem(20), right: rem(20) }}>
        <ExperimentalWarning />
      </Affix>
      <CytoscapeComponent
        cy={(cy) => {
          setCy(cy)
        }}
        userPanningEnabled={false}
        userZoomingEnabled={false}
        elements={elements}
        style={{ width: '100%', height: '100%' }}
        stylesheet={stylesheet}
        layout={layout}
      />
    </>
  )
}
