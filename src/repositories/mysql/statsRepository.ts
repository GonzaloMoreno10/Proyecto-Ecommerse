import { mysqlDataSource } from '../../services/mysql';

class StatsRepository {
  private connection = mysqlDataSource.connection();

  async getTop3MostSelledFromProductType(productId: number) {
    const sql = `select t2.* from products p
    join (
    select p.id,p.nombre aspNombre,pt.id as ptId,pt.nombre as ptNombre,t1.cantidad from products p 
    join product_types pt on pt.id = p.product_type_id 
    join(
    select count(*) as cantidad,p.id,pt.id as ptId from orderProducts op 
    join products p on p.id = op.productId 
    join product_types pt on pt.id = p.product_type_id 
    group by p.id,pt.id
    order by pt.id,cantidad desc) t1 on p.id = t1.id and p.product_type_id = t1.ptId) t2 on t2.id = p.id and t2.ptId = p.product_type_id 
    where p.id = ${productId}
    and t2.cantidad = (select count(*) as cantidad from orderProducts op 
    join products px on px.id = op.productId 
    join product_types ptx on ptx.id = px.product_type_id 
    where ptx.id = p.product_type_id 
    group by px.id,ptx.id
    order by cantidad desc limit 1)`;
    const result = await this.connection.execute(sql);
    return result[0];
  }
}

export const statsRepository = new StatsRepository();
