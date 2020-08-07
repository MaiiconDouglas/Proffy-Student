import { Request, Response} from 'express';

import db from '../database/connection';
import convertHourtToMinutes from '../utils/convertHourtToMinutes';


interface ScheduleItem {
  week_day: number,
  from: string;
  to: string;
}

export default class ClassesController { 
  async index(request: Request, response: Response) {  //listagem das aulas
    const filters = request.query;

    const subject = filters.subject as string;
    const week_day = filters.week_day as string;
    const time  = filters.time as string;

    //Dias da semana = week_day   //Materia = subject // horário que ele quer marcar = time
    if(!filters.week_day || !filters.subject || !filters.time) {
      return response.status(400).json({
        error: 'Missing filters to search classes'
      });
    }

    const timeInMinutes = convertHourtToMinutes(time);

    const classes = await db('classes')
      .whereExists(function() {
        this.select('class_schedule.*')
         .from('class_schedule')
         .whereRaw('`class_schedule`.`class_id` = `classes`.`id`')
         .whereRaw('`class_schedule`.`week_day` = ?? ', [Number(week_day)])
         .whereRaw('`class_schedule`.`from` <=?? ', [timeInMinutes])  
         .whereRaw('`class_schedule`.`to` > ?? ', [timeInMinutes])         
      })
      .where('classes.subject', '=', subject)
      .join('users', 'classes.user_id', '=', 'users.id')
      .select(['classes.*', 'users.*']);

    return response.json(classes);
  }
  
  async create(request: Request, response: Response) {
    const {
      nome,
      avatar,
      whatsapp,
      bio,
      subject,
      cost,
      schedule
    } = request.body;
  
  
    const trx = await db.transaction();
  
    //insertedUsersIds vai me retornar os ids cadastrados.
    const insertedUsersIds = await trx('users').insert({
      nome,
      avatar,
      whatsapp,
      bio,
    });
  
    const user_id = insertedUsersIds[0];
  
    try {
      const insertedClassesIds = await trx('classes').insert({
        subject,
        cost,
        user_id,    
      });
    
      const class_id = insertedClassesIds[0];
    
      const classSchedule =  schedule.map((scheduleItem: ScheduleItem) => {
        return {
          class_id,
          week_day: scheduleItem.week_day,
          from: convertHourtToMinutes(scheduleItem.from),
          to: convertHourtToMinutes(scheduleItem.to),
        };
      })
    
      await trx('class_schedule').insert(classSchedule);
    
      await trx.commit();  // insere toda a informação no banco de dados  de uma só vez.
    
      return response.status(201).send();   /*  Ele retorna um sucesso status 201 criado com sucesso*/
    
    } catch (err) {
      await trx.rollback(); 
      /*se acontecer alguma alteração nesse meio tempo o 
      rollback ele vai desfazer a alteração*/
  
      return response.status(400).json({
        error: 'Unexpected error while creating new class'
      })
    }
  
  }
}