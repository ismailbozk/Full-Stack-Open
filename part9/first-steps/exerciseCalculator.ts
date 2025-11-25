interface ExerciseResult {
  periodLength: number
  trainingDays: number
  success: boolean
  rating: number
  ratingDescription: string
  target: number
  average: number
}

interface ExerciseInput {
  target: number
  dailyHours: number[]
}

const parseExerciseArguments = (args: string[]): ExerciseInput => {
  if (args.length < 4) throw new Error('Not enough arguments')

  const target = Number(args[2])
  const dailyHours = args.slice(3).map((arg) => Number(arg))

  if (isNaN(target) || dailyHours.some((hour) => isNaN(hour))) {
    throw new Error('Provided values were not numbers!')
  }
  return {
    target,
    dailyHours,
  }
}

const calculateExercises = (input: ExerciseInput): ExerciseResult => {
  const { target, dailyHours } = input
  const periodLength = dailyHours.length
  const trainingDays = dailyHours.filter((day) => day > 0).length
  const totalHours = dailyHours.reduce((sum, hours) => sum + hours, 0)
  const average = totalHours / periodLength
  const success = average >= target

  let rating: number
  let ratingDescription: string

  if (average >= target) {
    rating = 3
    ratingDescription = 'Great job! You met your target.'
  } else if (average >= target * 0.75) {
    rating = 2
    ratingDescription = 'Not too bad but could be better.'
  } else {
    rating = 1
    ratingDescription = 'You need to work harder.'
  }

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average,
  }
}

try {
  const input: ExerciseInput = parseExerciseArguments(process.argv)
  const result = calculateExercises(input)
  console.log(result)
} catch (e) {
  if (e instanceof Error) {
    console.log('Error:', e.message)
  }
}
