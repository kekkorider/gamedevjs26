# New turn

## Start

- [✅] Pick a patient and a disease from the database

## Machine selection

- [✅] Select the machines to use for the diagnosis (maximum of 3)

## Score calculation

- [✅] Click on the "Calculate result" button
- [✅] For each machine used, remove from the current `money` its `usageCost`
- [✅] Check how many of the selected machines can diagnose the current disease. The result is in the range `[0, 1]`.

### Score == 1

- [✅] Add the `costDiagnosisOk` to the current `money`

### Score < 1

- [✅] Remove the `costDiagnosisNotOk` from the current `money`

Formula is: `money = money - (costDiagnosisNotOk * (1 - score))`

## End

- [✅] Check if the current `money` is less than 0. If so, the game is over.
- [✅] If the game is not over, start a new turn.

