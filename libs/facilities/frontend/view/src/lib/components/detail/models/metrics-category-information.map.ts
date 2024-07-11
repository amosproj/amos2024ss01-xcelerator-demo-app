import { Colors } from './colors';
import { EMetricsCategory } from './metrics-category.enum';

export const METRIC_CATEGORY_COLOR_INFORMATION: Record<
	EMetricsCategory,
	{ color: Colors; abbreviation: string }
> = {
	[EMetricsCategory.MIN]: { color: Colors.LIME, abbreviation: 'Min' },
	[EMetricsCategory.MAX]: { color: Colors.PINK, abbreviation: 'Max' },
	[EMetricsCategory.MEAN]: { color: Colors.GREEN, abbreviation: 'Mean' },
	[EMetricsCategory.VARIANCE]: { color: Colors.STONE, abbreviation: 'Variance' },
	[EMetricsCategory.STANDARD_DEVIATION]: { color: Colors.PURPLE, abbreviation: 'StdDev' },
	[EMetricsCategory.COEFFICIENT_OF_VARIATION]: { color: Colors.BLUE, abbreviation: 'CV' },
};
