# TextAnalyzer
A Text Analyzer which analyzes the text entered by user and provides some insights.


A Text analyzer can include some heavy computations on the client side, These computations can block the main thread if they are not quick and efficient
or they need to process a large amount of data, which can lead to unresponsiveness on the UI.

Its better these computations can be handed to a worker which can then communicate with the main thread and pass in the computations when its done

 A Web Worker can come in pretty handy in these situations.
