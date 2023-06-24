import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "src/user/user.entity";
import { DataSource } from "typeorm";

export const createDbConnection = (entities: any[]) => {
    return [
        TypeOrmModule.forRoot({
            "type": "sqlite",
            "database": ":memory:",
            "dropSchema": true,
            "synchronize": true,
            "logging": false,
            "entities": [...entities]
        }),
        TypeOrmModule.forFeature([...entities])
    ];

};

export const closeConnection = async (connection: DataSource) => {
    await connection.destroy();
};
