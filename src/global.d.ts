declare module 'react-treebeard' {
  import React from 'react';
  // aliases for less eyestrain
  type TreeDecoratorTypes = 'Loading' | 'Toggle' | 'Header' | 'Container';
  type CSS = React.CSSProperties;

  export type TreeAnimations = Object;
  export interface TreeTheme {
    tree: {
      base: CSS;
      node: {
        base: CSS;
        link: CSS;
        activeLink: CSS;
        toggle: {
          base: CSS;
          wrapper: CSS;
          height: number;
          width: number;
          arrow: CSS;
        };
        header: {
          base: CSS;
          connector: CSS;
          title: CSS;
        };
        subtree: CSS;
        loading: CSS;
      };
    };
  }
  export type TreeDecorators = { [T in TreeDecoratorTypes]?: React.ElementType };
  export interface TreeNode {
    /** The component key. If not defined, an auto - generated index is used. */
    id?: string;
    /** The name prop passed into the Header component. */
    name: string;
    /** The children attached to the node. This value populates the subtree at the specific node.Each child is built from the same basic data structure.
     *
     * Tip: Make this an empty array, if you want to asynchronously load a potential parent. */
    children?: Array<TreeNode>;
    /** Toggled flag. Sets the visibility of a node's children. It also sets the state for the toggle decorator. */
    toggled?: boolean;
    /** Active flag. If active, the node will be highlighted.The highlight is derived from the node.activeLink style object in the theme. */
    active?: boolean;
    /** Loading flag. It will populate the treeview with the loading component.Useful when asynchronously pulling the data into the treeview. */
    loading?: boolean;
    /** Attach specific decorators to a node. Provides the low level functionality to create visuals on a node-by-node basis. */
    decorators?: TreeDecorators;
    /** Attach specific animations to a node. Provides the low level functionality to create visuals on a node-by-node basis. */
    animations?: TreeAnimations;
  }
  interface TreebeardProps {
    data: TreeNode | Array<TreeNode>;
    onToggle?: (node: TreeNode, toggled: boolean) => void;
    style?: TreeTheme;
    animations?: TreeAnimations | boolean;
    decorators?: TreeDecorators;
  }
  export const Treebeard: React.ElementType<TreebeardProps>;
  export const decorators: TreeDecorators;
  export const animations: TreeAnimations;
  export const theme: TreeTheme;
}
