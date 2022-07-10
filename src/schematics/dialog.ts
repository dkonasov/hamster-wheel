import { Rule, SchematicContext, Tree, apply, url, template, mergeWith, move, strings } from '@angular-devkit/schematics';

interface DialogSchema {
  name: string;
}

export default function (options: DialogSchema): Rule {
  const { classify, dasherize } = strings;
  return (tree: Tree, context: SchematicContext) => {
    const templateSource = apply(url('../schematics-templates/dialog'), [
      // pass our options variables to the template.
      template({
        ...options,
        classify,
        dasherize,
      }),
      move(`./src/components/dialogs/${options.name}/`)
    ]);
    return mergeWith(templateSource)(tree, context);
    // tree.create(`./src/components/dialogs/${_options.name}/${_options.name}-dialog.tsx`, "// TODO: implement tsx");
    // tree.create(`./src/components/dialogs/${_options.name}/${_options.name}-dialog.module.css`, "/* TODO: implement styles */");
    // return tree;
  };
}
