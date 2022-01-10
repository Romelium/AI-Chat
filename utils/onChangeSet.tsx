import React from 'react';

export function onChangeSet(setState: React.Dispatch<React.SetStateAction<any>>) {
  return (e: React.ChangeEvent<any>) => {
    setState(e.currentTarget.value);
  };
}
