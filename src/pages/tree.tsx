import React from "react"
import { ReactJSXElement } from "@emotion/react/types/jsx-namespace"

type TreeNode = string | Parent

interface Parent {
  name: string
  children: Array<TreeNode>
}

type LevelProps = {
  hi: boolean
  className: string
}

const Element = ({
  children,
  hi,
  Level,
  className,
}: React.PropsWithChildren<LevelProps> & {
  Level: React.FC<LevelProps>
  className?: string
}) => (
  <Level hi={hi} className={className}>
    {children}
  </Level>
)

Element.defaultProps = {
  className: "",
}

const FirstLevel = ({
  children,
  className,
  hi,
}: React.PropsWithChildren<LevelProps>) => (
  <div
    className={`ml-2 text-lg text-3xl font-extrabold tracking-wider uppercase ${className} ${
      hi ? "#ff4000" : ""
    }`}
  >
    {children}
  </div>
)
const SecondLevel: React.FC<LevelProps> = ({
  children,
  className,
  hi,
}: React.PropsWithChildren<LevelProps>) => (
  <div
    className={`ml-5 text-lg text-2xl font-extrabold tracking-wider uppercase ${className} ${
      hi ? "#ff4000" : ""
    }`}
  >
    {children}
  </div>
)

const ThirdLevel: React.FC<LevelProps> = ({
  children,
  className,
  hi,
}: React.PropsWithChildren<LevelProps>) => (
  <div
    className={`text-lg text-xl font-extrabold tracking-wider text-gray-300 uppercase ml-7 ${className} ${
      hi ? "#ff4000" : ""
    }`}
  >
    {children}
  </div>
)

const LEVELS: Record<string, React.FC<LevelProps>> = {
  0: FirstLevel,
  1: SecondLevel,
  2: ThirdLevel,
}

const renderTree = ({
  parents,
  level,
  highlighted,
}: {
  parents: Array<TreeNode>
  level: number
  highlighted: Array<string>
}) => {
  return (
    <>
      {parents.map((parentOrLeaf: TreeNode) => {
        const NextDiv = LEVELS[level + 1]
        if ((parentOrLeaf as Parent).children) {
          const parent = parentOrLeaf
          const { name } = parent as Parent
          return (
            <>
              <Element
                hi={highlighted && highlighted.includes(name)}
                Level={LEVELS[level]}
              >
                <>{name}</>
              </Element>
              <NextDiv hi={false} className={`mt-${level}`}>
                {renderTree({
                  parents: [...(parent as Parent).children],
                  level: level + 1,
                  highlighted,
                })}
              </NextDiv>
            </>
          )
        }
        const leaf = parentOrLeaf
        return (
          <>
            <Element
              hi={highlighted.includes(leaf as string)}
              Level={LEVELS[level]}
            >
              {leaf}
            </Element>
          </>
        )
      })}
    </>
  )
}

export const Tree = ({
  parents,
  highlighted,
}: {
  parents: Array<TreeNode>
  highlighted?: Array<string>
}): ReactJSXElement => {
  return (
    <div className="bg-gray">
      {/*renderTree({ parents, level: 0, highlighted: highlighted || [] })*/}
    </div>
  )
}

Tree.defaultProps = {
  highlighted: [],
}

export default Tree
