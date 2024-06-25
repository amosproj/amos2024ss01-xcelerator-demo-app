/**
 * Indicates why we are sending a certain {@link EPumpStatus}
 */
export enum EPumpIndicatorMessage {
    /**
     * The pump is working as expected
     */
    REGULAR = 'The pump is working as expected',

    /**
     * The pump's flow dropped below the threshold
     */
    FLOW_DROP = 'The pump\'s flow dropped below the threshold',

    /**
     * The pump's flow stayed below the threshold for over 10 minutes
     */
    FLOW_LOW_DURATION = 'The pump\'s flow stayed below the threshold for over 10 minutes',

    /**
     * The pump's StuffingBoxTemperature rose while the flow remained stable
     */
    TEMP_RISE_FLOW_STABLE = 'The pump\'s StuffingBoxTemperature rose while the flow remained stable',

    /**
     * The pump's standard deviation is above the threshold
     */
    STANDARD_DEVIATION = 'The pump\'s standard deviation is above the threshold',
}
