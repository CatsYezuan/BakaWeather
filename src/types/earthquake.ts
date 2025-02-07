export interface EarthquakeWarning {
  Report: {
    Head: {
      ReportType: string
      ReportClass: string
    }
    Body: {
      Earthquake: {
        JmaMagnitude: number
        RegionName: string
        Hypocenter: {
          Depth: {
            Value: number
            Unit: string
          }
        }
      }
    }
  }
} 