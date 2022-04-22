import React, { createContext, useState } from "react";

/*
    There are four steps to using React context:
    1. Create context using the createContext method.
    2. Take your created context and wrap the context provider around your component tree.
    3. Put any value within any component by using the value prop
    4. Read the value within any component by using the context consumer.
*/

export const BaseContext = createContext();

export const BaseProvider = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [refresh, setRefresh] = useState(false);

  return (
    <BaseContext.Provider
      value={{ collapsed, setCollapsed, refresh, setRefresh }}
    >
      {children}
    </BaseContext.Provider>
  );
};

/*
    Các câu hỏi xung quanh context;
    1. Khi thay đổi value của context attribute thì các component sẽ được re render lại đúng không?
*/
