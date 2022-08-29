import React, { forwardRef, useMemo } from 'react';
import cs from 'classnames';

import styles from './style.module.scss';

export type TypographyProps = {
	tag?: string;
	testId?: string;
	id?: string;
	variant?:
	| 'textD1'
	| 'h1'
	| 'h2'
	| 'h3'
	| 'h4'
	| 'textP1'
	| 'textP2'
	| 'textP1Link'
	| 'textB1'
	| 'textB2'
	| 'textS1'
	| 'textO1'
	| 'textO2';
	bold?: boolean;
	light?: boolean;
	semiBold?: boolean;
	upper?: boolean;
	capitalize?: boolean;
	className?: string;
	overflowForLines?: number;
	breakSpaces?: boolean;
	children: React.ReactNode;
	onClick?: (event?: any) => void;
};

export const Typography = forwardRef(
	(
		{
			tag = 'span',
			variant = 'textP1',
			semiBold,
			bold,
			upper,
			capitalize,
			light,
			className,
			children,
			overflowForLines,
			breakSpaces,
			onClick,
			testId,
			id,
		}: TypographyProps,
		ref
	): React.ReactElement => {
		const computedClassName = useMemo(
			() =>
				cs(
					styles.base,
					[styles[variant]],
					{
						[styles.semiBold]: semiBold,
						[styles.bold]: bold,
						[styles.light]: light,
						[styles.upper]: upper,
						[styles.capitalize]: capitalize,
						[styles.breakSpaces]: breakSpaces,
						[styles.textOverflow]: typeof overflowForLines !== 'undefined',
					},
					className
				),
			[
				className,
				semiBold,
				bold,
				upper,
				variant,
				overflowForLines,
				light,
				breakSpaces,
				capitalize,
			]
		);

		const style = useMemo(() => {
			const styles: Record<string, string> = {};
			overflowForLines && (styles.WebkitLineClamp = String(overflowForLines));
			return styles;
		}, [overflowForLines]);

		return React.createElement(
			tag,
			{
				'data-test-id': testId,
				className: computedClassName,
				style,
				onClick,
				ref,
				id,
			},
			children
		);
	}
);

Typography.displayName = 'Typography';

export default Typography;