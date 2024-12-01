/// <reference types="vite/client" />

// declare module '*.svg' {
//     const content: string;
//     export default content;
// }

declare module '*.svg' {
    import type * as React from 'react';
    export const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>;
    const src: string;
    export default src;
}


// in case we need to use svg as a react component as a change of heart/mind

{/*
    declare module '*.svg' {
    import type * as React from 'react';
    export const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>;
    const src: string;
    export default src;
}
*/}