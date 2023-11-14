import {readCSV, toCSV} from "danfojs";
import sleepEfficiencyUrl from "url:../data/sleepEfficiency.csv";
import {toCSVBrowser} from "danfojs/dist/danfojs-base/io/browser";

readCSV(sleepEfficiencyUrl).then((df) => {
    //Step 1 - Remove unnecessary columns
    df = df.drop({
        columns: [
            "Wakeup time",
            "Deep sleep percentage",
            "Light sleep percentage",
            "REM sleep percentage",
            "Awakenings"
        ]
    });

    //Step 2 - Calculate effective sleep & remove root columns
    df = df.addColumn("Effective sleep", df["Sleep duration"].mul(df["Sleep efficiency"]));

    df = df.drop({
        columns: [
            "Sleep duration",
            "Sleep efficiency"
        ]
    });

    //Step 3 - process bedtime
    const sleepHourSeries = df["Bedtime"].apply((bedtime) => {
        const sleepDateTime = new Date(bedtime);
        return sleepDateTime.getHours();
    });

    df = df.addColumn("Sleep hour", sleepHourSeries);

    df = df.drop({
        columns: [
            "Bedtime"
        ]
    });

    //Step 4 - fill null values
    df["Caffeine consumption"].unique().print()

    df.fillNa(0, {columns: ["Caffeine consumption"], inplace: true});
    df.fillNa(0, {columns: ["Alcohol consumption"], inplace: true});
    df.fillNa(0, {columns: ["Exercise frequency"], inplace: true});

    //Step 5 - Convert columns to categorical data
    df.replace("Male", "0", {columns: ["Gender"], inplace: true})
    df.replace("Female", "1", {columns: ["Gender"], inplace: true})

    df.replace("No", "0", {columns: ["Smoking status"], inplace: true})
    df.replace("Yes", "1", {columns: ["Smoking status"], inplace: true})


    //Step 6 - try out a scatter plot
    df.plot("visualisationDiv").scatter({
        config: {x: "Age", y: "Effective sleep"}
    })

    //Step 7 - download our prepared csv
    // toCSVBrowser(df, {download: true});

    df.plot("tableDiv").table({});
});