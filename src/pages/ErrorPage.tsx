import React from 'react'

export const ErrorPage = () => {
  return (
   <div className="text-center text-red-500 p-10">
    <h2 className="text-2xl font-bold">Что-то пошло не так 😢</h2>
    <p>Страница не найдена или произошла ошибка маршрута.</p>
  </div>
  )
}
