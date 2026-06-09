'use client';

import { useEffect } from 'react';

/**
 * Monkey-patches Node.prototype.removeChild and insertBefore to prevent React 
 * from crashing when Google Translate manipulates the DOM tree.
 */
export default function TranslateFix() {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const originalRemoveChild = Node.prototype.removeChild;
      Node.prototype.removeChild = function <T extends Node>(child: T): T {
        if (child.parentNode !== this) {
          if (console) {
            console.warn('TranslateFix: Prevented crash when removing a node not attached to parent', child);
          }
          return child;
        }
        return originalRemoveChild.call(this, child) as T;
      };

      const originalInsertBefore = Node.prototype.insertBefore;
      Node.prototype.insertBefore = function <T extends Node>(newNode: T, referenceNode: Node | null): T {
        if (referenceNode && referenceNode.parentNode !== this) {
          if (console) {
            console.warn('TranslateFix: Prevented crash when inserting before a detached reference node', referenceNode);
          }
          return newNode;
        }
        return originalInsertBefore.call(this, newNode, referenceNode) as T;
      };
    }
  }, []);

  return null;
}
