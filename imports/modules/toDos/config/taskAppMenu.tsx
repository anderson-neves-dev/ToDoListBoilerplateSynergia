import React from 'react';
import { IAppMenu } from '/imports/modules/modulesTypings';
import SysIcon from '/imports/ui/components/sysIcon/sysIcon';
export const taskMenuItemList: (IAppMenu | null)[] = [
	{
		path: '/tasks',
		name: 'Tasks',
		icon: <SysIcon name={'dragIndicator'} />
	}
];
