import React from "react";

const {{cookiecutter.app_root_module_name}}: React.FC = () => {
    const moduleName = "{{cookiecutter.app_root_module_name}}";
    return <>
        This is the {moduleName} rendered.
    </>;
}

export default {{cookiecutter.app_root_module_name}};