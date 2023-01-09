
	USE DEME0122;  
	GO  
	CREATE PROCEDURE insertDataOEE
		@idMachine INT, @capturedTime VARCHAR(25), @oee FLOAT, @availability FLOAT, @runTime INT, @availableTime INT, @performance FLOAT, @ict FLOAT, @totalPieces INT, @quality FLOAT, @goodParts INT, @lotId VARCHAR(100), @partId VARCHAR(100), @idShift INT
		, @existRegister INT
	AS   
		SET @capturedTime = CONVERT(datetime, @capturedTime, 101 );
		SET @existRegister = (SELECT COUNT(id) FROM oee WHERE idmachine = @idMachine AND capturedTime = @capturedTime AND oee = @oee AND availability = @availability AND runTime = @runTime AND availableTime = @availableTime AND performance = @performance AND ict = @ict AND totalPieces = @totalPieces AND quality = @quality AND goodParts = @goodParts AND lotId = @lotId AND partId = @partId AND idShift = @idShift);

		IF @existRegister = 0
			INSERT INTO oee(id, idmachine, capturedTime, oee, availability, runTime, availableTime, performance, ict, totalPieces, quality, goodParts, lotid, partid, idShift, shifhtDate) VALUES(NEWID(), @idMachine, @capturedTime, @oee, @availability, @runTime, @availableTime, @performance, @ict, @totalPieces, @quality, @goodParts, @lotId, @partId, @idShift, GETDATE());
	GO 